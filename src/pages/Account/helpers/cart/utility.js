import * as CONSTANTS from '../../../../config/constants/statusCodes'
export const cartValidation = (StateData, PropsData) => {
  const {
    name,
    phone,
    order_type,
    address,
    table_no,
    table_code,
    room_number,
    room_code,
    dob_customer,
  } = StateData
  const { cart, tables, translation, is_room_delivery_dob_enable, rooms } =
    PropsData
  const errors = []
  if (!name) errors.push('name')
  if (!phone) errors.push('phone')
  if (!order_type) errors.push('order_type')
  if (order_type === 1) {
    if (!table_no && tables.length >= 1) errors.push('table_no')
  }
  if (order_type === 3) {
    if (!address) errors.push('address')
  }
  if (order_type === 4) {
    if (!room_number) errors.push('room_number')
    // if (is_room_delivery_dob_enable === 1) {
    //     if (!dob_customer) {
    //         errors.push("dob_customer");
    //     } else {
    //         if (_calculateAge(dob_customer) < 18) {
    //             alert(
    //                 translation?.age_error_message ||
    //                     "AGE ERROR AGE IS UNDER 18"
    //             );
    //             errors.push("dob_customer");
    //         }
    //     }
    // }
    if (room_number) {
      const room = rooms.find((e) => e.room_name === room_number)
      if (room.room_code && order_type === 4) {
        if (room.room_code !== room_code) {
          alert(
            translation?.room_code_error_message ||
              'INVALID ROOM CODE/PLEASE ENTER A VALID CODE'
          )
          errors.push('room_code')
        }
      }
    }
  }
  if (tables) {
    if (table_no) {
      let data = tables.filter((data) => data.table_name === table_no)
      if (data[0]?.table_code && order_type === 1) {
        if (!(data[0]?.table_code === table_code)) {
          alert(
            translation?.table_code_error_message ||
              'INVALID TABLE CODE/PLEASE ENTER A VALID CODE'
          )
          errors.push('table_code')
        }
      }
    }
  }

  return errors
}

export const calculateTotal = (cartData, applied_coupon, props, storeId) => {
  if (cartData.length !== undefined) {
    let { products, cart, addons } = props
    let product
    let sum = 0
    let addon = 0
    let temp_sum = 0
    cart = cartData.filter((data) => data.storeId === storeId)
    let Extrasum = 0
    for (const item in cart) {
      let product = products.find((data) => data.id === cart[item].itemId)
      if (cart[item].addon != null) {
        let temp = addons.find((data) => data.id === cart[item].addon)
        if (temp) {
          sum = sum + Number(temp.price) * cart[item].count
        } else {
          sum = sum + product.price * cart[item].count
        }
      } else sum = sum + product.price * cart[item].count
      if (cart[item].extra) {
        for (let ext in cart[item].extra) {
          let temp = addons.find(
            (data) => data.id === cart[item].extra[ext].addon_id
          )
          temp_sum = temp.price * cart[item].extra[ext].calculationcount
          Extrasum += temp_sum
        }
      }
    }
    return sum + Extrasum
  }
}

export const applyCoupon = (applied_coupon, sum) => {
  if (applied_coupon?.name) {
    if (applied_coupon.discount_type === CONSTANTS.PERCENTAGE) {
      let discount = sum * (Number(applied_coupon.discount) / 100)
      sum = sum - discount
    } else if (applied_coupon.discount_type === CONSTANTS.AMOUNT) {
      sum = sum - Number(applied_coupon.discount)
      sum = sum < 0 ? 0 : sum
    }
    return sum
  }
  return sum
}

export const _calculateAge = (birthday) => {
  var date = new Date(birthday)
  var ageDifMs = Date.now() - date.getTime()
  var ageDate = new Date(ageDifMs)
  return Math.abs(ageDate.getUTCFullYear() - 1970)
}
