import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  EMPTY_CART,
  UPDATE_CART,
  UPDATE_TOTAL_AMOUNT,
} from './actionTypes'

const initialState = {
  Items: [],
  // totalAmount:0,
  // applied_coupon: {}
}

export default function (state = initialState, actions) {
  switch (actions.type) {
    case ADD_TO_CART: {
      let data = state.Items.find(
        (items) =>
          items.itemId === actions.data.itemId &&
          items.storeId === actions.data.storeId &&
          items.addon === actions.data.addon
      )
      if (data) {
        if (actions.data.extra && actions.data.extra.length) {
          return {
            ...state,
            Items: [...state.Items, actions.data],
          }
        } else {
          data.count = data.count + actions.data.count
          return {
            ...state,
            Items: state.Items.map((Item) =>
              Item.itemId === data.itemId &&
              Item.addon === data.addon &&
              Item._id === data._id
                ? {
                    ...Item,
                    count: data.count,
                    addon: actions.data.addon,
                    extra: actions.data.extra,
                  }
                : Item
            ),
          }
        }
      }
      return {
        ...state,
        Items: [...state.Items, actions.data],
      }
    }
    case UPDATE_CART: {
      let data = state.Items.find(
        (items) =>
          items.itemId === actions.data.itemId &&
          items.storeId === actions.data.storeId &&
          items.addon === actions.data.addon &&
          items._id === actions.data._id
      )
      data.count = data.count + actions.data.count
      return {
        ...state,
        Items: state.Items.map((Item) =>
          Item.itemId === data.itemId &&
          Item.addon === data.addon &&
          Item._id === data._id
            ? {
                ...Item,
                count: data.count,
                addon: actions.data.addon,
                extra: actions.data.extra,
              }
            : Item
        ),
      }
    }
    case REMOVE_FROM_CART:
      const _id = actions.data
      return {
        ...state,
        Items: state.Items.filter((Item) => Item._id !== _id),
      }

    case EMPTY_CART:
      return {
        ...state,
        Items: [],
      }

    case UPDATE_TOTAL_AMOUNT:
      return {
        ...state,
        totalAmount: actions.payload,
      }

    default:
      return state
  }
}
