const store = {
  state: {
    hotSearchOffsetY: 0,
    flapCardVisible: false,
    isEditMode: false,
    shelfList: [],
    shelfSelected: [1,2,3],
    shelfTitleVisible: true
  },
  mutations: {
    'SET_HOT_SEARCH_OFFSETY': (state, offsetY) => {
      state.hotSearchOffsetY = offsetY
    },
    'SET_FLAP_CARD_VISIBLE': (state, visible) => {
      state.flapCardVisible = visible
    },
    'SET_IS_EDIT_MODE': (state, isEditMode) => {
      state.isEditMode = isEditMode
    },
    'SET_SHELF_LIST': (state, shelfList) => {
      state.shelfList = shelfList
    },
    'SET_SHELF_SELECTED': (state, shelfSelected) => {
      state.shelfSelected = shelfSelected
    },
    'SET_SHELF_TITLE_VISIBLE': (state, visible) => {
      state.shelfTitleVisible = visible
    }
  }
}
export default store
