/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import Overlay from 'ol/Overlay';
import './popup.scss';

const Popup = ({ map, except }) => {
  useEffect(() => {
    if (!map) return;

    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');

    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });

    closer.onclick = function () {
      overlay.setPosition(undefined);
      closer.blur();
      return false;
    };

    map.on('singleclick', (evt) => {
      const { coordinate } = evt;
      const features = map.getFeaturesAtPixel(evt.pixel);
      if (features.length < 1) {
        overlay.setPosition(undefined);
        closer.blur();
        content.innerHTML = '';
        return;
      }
      const properties = features[0].getProperties();
      const { layer_id } = properties;
      if (layer_id === except) {
        overlay.setPosition(undefined);
        closer.blur();
        return;
      }
      content.innerHTML = `<div class="leaflet-popup-content-wrapper">
      <div class="leaflet-popup-content" style="width: 301px;">
        <div class="map-popup-wrapper">
          <div class="map-popup-header is-flex is-between mb-10 is-gap-15">
            <div class="is-flex is-start is-align-start is-gap-15">
              <figure class="is-circle is-circle_img is-circle_sm is-circle_bg"></figure>
              <div class="flex-content is-grow">
                <h5 class="primary-300 is-capitalize">data 1</h5>
                <p>हेमजा हस्पिटल एंड रिसर्च सेन्टर</p>
              </div>
              <i class="material-icons">edit</i>
            </div>
          </div>
          <div class="naxa-table is-overflow">
            <table class="table font-size-md">
              <thead></thead>
              <thead></thead>
              <tbody>
              ${Object.keys(properties).reduce(
                (str, key) =>
                  `${str}
                <tr>
                  <td>${key}</td>
                  <td><b>${properties[key]}</b>
                  </td>
                </tr>`,
                '',
              )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

      overlay.setPosition(coordinate);
      map.addOverlay(overlay);
    });
  }, [map, except]);

  return (
    <div id="popup" className="ol-popup">
      <a href={() => {}} id="popup-closer" className="ol-popup-closer" />
      <div id="popup-content" className="is-overflow" />
    </div>
  );
};

export default Popup;
