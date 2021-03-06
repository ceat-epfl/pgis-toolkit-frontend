/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
import church from '@Assets/images/svgIcons/church.svg';
import delivery from '@Assets/images/svgIcons/delivery.svg';
import directions from '@Assets/images/svgIcons/directions.svg';
import flight from '@Assets/images/svgIcons/flight.svg';
import home from '@Assets/images/svgIcons/home.svg';
import local_atm from '@Assets/images/svgIcons/local_atm.svg';
import local_hospital from '@Assets/images/svgIcons/local_hospital.svg';
import park_black from '@Assets/images/svgIcons/park_black.svg';
import place_black from '@Assets/images/svgIcons/place_black.svg';
import roller_shades from '@Assets/images/svgIcons/roller_shades.svg';
import search_black from '@Assets/images/svgIcons/search_black.svg';
import sensor_window from '@Assets/images/svgIcons/sensor_window.svg';
import subway_black from '@Assets/images/svgIcons/subway_black.svg';
import train_black from '@Assets/images/svgIcons/train_black.svg';
import vertical_shades from '@Assets/images/svgIcons/vertical_shades.svg';

export const svgIcons = [
  { id: '1', icon: church, color: '#FFFFFF' },
  { id: '2', icon: delivery, color: '#FFFFFF' },
  { id: '3', icon: directions, color: '#FFFFFF' },
  { id: '4', icon: flight, color: '#FFFFFF' },
  { id: '5', icon: home, color: '#FFFFFF' },
  { id: '6', icon: local_atm, color: '#FFFFFF' },
  { id: '7', icon: local_hospital, color: '#FFFFFF' },
  { id: '8', icon: park_black, color: '#FFFFFF' },
  { id: '9', icon: place_black, color: '#FFFFFF' },
  { id: '10', icon: roller_shades, color: '#FFFFFF' },
  { id: '11', icon: search_black, color: '#FFFFFF' },
  { id: '12', icon: sensor_window, color: '#FFFFFF' },
  { id: '13', icon: subway_black, color: '#FFFFFF' },
  { id: '14', icon: train_black, color: '#FFFFFF' },
  { id: '15', icon: vertical_shades, color: '#FFFFFF' },
];

// arr = [{}, {}];
// arr1 = [{}, {}];

// newArr = [{}, {}, {}, {}];
// newarr.map((arr)=>{
//   if(arr.type=== 'group'){
//     return {...arr,r}
//   }else{
//     return {...arr}
//   }
// })
// const group = item?.group;
//     const layerss = item?.layer;
//     const arrs = [];
//     group.forEach((element) =>
//       arrs.push({
//         ...element,
//         type: 'group',
//         name: element.name,
//         id: element.id,
//         isSelected: false,
//         options: element.layer.map((elements) => ({
//           ...elements,
//           isSelected: false,
//         })),
//       }),
//     );
//     layerss.forEach((element) =>
//       arrs.push({
//         ...element,
//         name: element.name,
//         id: element.id,
//         icon: element.icon,
//         iconSize: element.icon_size,
//         type: 'layerWithSubLayer',
//         isSelected: false,
//         options: element.sub_layer.map((elements) => ({
//           ...elements,
//           isSelected: false,
//         })),
//       }),
//     );
//     console.log(newArrs, 'items ');

// ? [
//     item.group
//       .map((grp) => ({
//         // ...items,
//         type: 'group',
//         name: grp.name,
//         id: grp.id,
//         isSelected: false,
//         options: grp.layer.map((elements) => ({
//           ...elements,
//           isSelected: false,
//         })),
//       }))
//       .reduce((arr, items) => ({ ...arr, ...items }), {}),

//     item.layer
//       .map((layers) => ({
//         ...layers,
//         name: layers.name,
//         id: layers.id,
//         icon: layers.icon,
//         iconSize: layers.icon_size,
//         type: 'layerWithSubLayer',
//         isSelected: false,
//         options: layers.sub_layer.map((elements) => ({
//           ...elements,
//           isSelected: false,
//         })),
//       }))
//       .reduce((arr, items) => ({ ...arr, ...items }), {}),
//   ].filter((elementss) => !isEmpty(elementss))
