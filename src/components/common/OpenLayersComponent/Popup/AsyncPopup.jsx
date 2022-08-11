/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { renderToString } from 'react-dom/server';
import Overlay from 'ol/Overlay';
import { siteId, regionId } from '@src/constants/map';
import { getCenter } from 'ol/extent';
import './Popup/popup.scss';
import Button from '@Components/common/Button/index';

function hasKey(obj, key) {
  return Object.keys(obj).some((item) => item === key);
}

const popupId = 'popupx';

const AsyncPopup = ({ map, popupUI, buttonText, onButtonClick, closePopup = false, loading = false }) => {
  const popupRef = useRef(null);
  const popupCloserRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [overlay, setOverlay] = useState(null);
  const [properties, setProperties] = useState(null);
  const [popupHTML, setPopupHTML] = useState('');
  const [propertiesId, setPropertiesId] = useState(null);

  // add overlay to popupRef
  useEffect(() => {
    if (!map || !popupRef.current) return;
    const overlayInstance = new Overlay({
      element: popupRef.current,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
      id: popupId,
    });
    setOverlay(overlayInstance);
  }, [map, popupRef]);

  // function for closing popup
  const closePopupFn = useCallback(() => {
    if (!popupCloserRef.current || !overlay) return;
    overlay.setPosition(undefined);
    // onPopupClose();
    setPopupHTML('');
    setProperties(null);
    popupCloserRef.current.blur();
  }, [overlay, popupCloserRef]);

  useEffect(() => {
    if (!map || !closePopup) return;
    closePopupFn();
  }, [map, closePopup, closePopupFn]);

  // get properties and coordinates of feature
  useEffect(() => {
    if (!map) return;
    map.on('click', (evt) => {
      const { coordinate } = evt;
      const features = map.getFeaturesAtPixel(evt.pixel);
      if (features.length < 1) {
        closePopupFn();
        return;
      }
      const featureProperties = features[0].getProperties();
      const { layer_id, Name, Category, id } = featureProperties;
      setPropertiesId(id);
      setCoordinates(coordinate);
    });
  }, [map, closePopupFn]);

  // getPopupUI, setpopupHTML, setOverlayPosition, addOverlayToMap
  useEffect(() => {
    if (!map || !coordinates || !overlay || !properties || closePopup) return;
    const htmlString = renderToString(popupUI(properties));
    setPopupHTML(htmlString);
    overlay.setPosition(coordinates);
    const popupOverlay = map.getOverlayById(popupId);
    if (!popupOverlay) {
      map.addOverlay(overlay);
    }
  }, [map, overlay, coordinates, popupUI, properties, closePopup]);

  return (
    <div ref={popupRef} id="popup" className="ol-popup">
      <a ref={popupCloserRef} href={() => {}} id="popup-closer" className="ol-popup-closer" onClick={closePopupFn} />
      <div id="popup-content" dangerouslySetInnerHTML={{ __html: popupHTML }} />
      {properties?.layer === 'site' && !loading && (
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
          }}
        >
          <Button label={buttonText} onClick={() => onButtonClick(propertiesId)} />
        </div>
      )}
    </div>
  );
};

export default AsyncPopup;
