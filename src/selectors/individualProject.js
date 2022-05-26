import { createSelector } from 'reselect';

const layerData = (state) => state.individualProject.layerData;
const searchKey = (state) => state.individualProject.searchData;
const fileSelector = (state) => state.individualProject.file;
const addUploadDataSelector = (state) => state.individualProject.addUploadData;

// eslint-disable-next-line
export const searchedLayerSelector = createSelector(layerData, searchKey, (layData, keyword) => {
  if (keyword) {
    const layDataFilter = layData
      ?.map((item) => ({
        ...item,
        options: item.options.filter((element) => element?.name?.toLowerCase().includes(keyword?.toLowerCase())),
      }))
      .filter((items) => items.options.length);
    return layDataFilter;
  }
  return layData;
});

export const finalUploadDataSelector = createSelector(fileSelector, addUploadDataSelector, (file, data) => {
  const finalUploadData = {
    file,
    theme: data.themeId,
    name: data.layerName,
    default: data.default,
    layer_type: 'Vector',
    is_osm_layer: 'False',
  };
  return finalUploadData;
});
