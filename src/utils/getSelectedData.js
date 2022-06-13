/* eslint-disable no-nested-ternary */
export const getSelectedData = (data, name, categoryName, id) =>
  data?.map((item) =>
    item.name === name
      ? {
          ...item,
          options: item.options.map((element) =>
            element.name === categoryName
              ? element.type === 'group'
                ? {
                    ...element,
                    isSelected: !element.isSelected,
                    options: element.options.map((items) =>
                      items.id === +id
                        ? {
                            ...items,
                            isSelected: !items.isSelected,
                          }
                        : { ...items },
                    ),
                  }
                : {
                    ...element,
                    options: element.options.map((items) => ({
                      ...items,
                      isSelected: !element.isSelected,
                    })),
                    isSelected: !element.isSelected,
                  }
              : { ...element },
          ),
        }
      : { ...item },
  );

export const getSelectedDataFromSubLayer = (data, name, categoryName, id) =>
  data.map((item) =>
    item.name === name
      ? {
          ...item,
          options: item.options.map((element) =>
            element.name === categoryName
              ? {
                  ...element,
                  // isSelected: element.options.some((datas) => datas.isSelected === true),
                  options: element.options.map((items) =>
                    items.id === +id
                      ? {
                          ...items,
                          isSelected: !items.isSelected,
                        }
                      : { ...items },
                  ),
                }
              : { ...element },
          ),
        }
      : { ...item },
  );