import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/responsive'
import { COLORS } from '../../../theme/palette';
import ImageProduct from '../../../assets/images/Rectangle.png';
import { FONTS } from '../../../theme/fonts';
import { NumericInput } from '../Inputs/NumericInput';
import { hp, wp } from '../../../utils/dimensions';

const ProductCard = ({ 
  productName = "Calvin Klein", 
  quantity = 15, 
  price = "108'000 HTG",
  imageSource = null, // Prop pour l'image
  imageStyle = {}, // Style personnalisable pour l'image
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.containerImage}>
          {imageSource && (
            <Image 
              source={imageSource} 
              style={[styles.defaultImageStyle, imageStyle]} 
              resizeMode="cover"
            />
          )}
        </View>

        <View style={styles.containerText}>
          <View style={styles.containerName}>
            <Text style={styles.productName}>{productName}</Text>
            <Text style={styles.productQuantity}>Quantité : {quantity}</Text>
          </View>

          <View style={styles.containerAmount}>
            <Text style={styles.productAmount}>{price}</Text>
          </View>
        </View>

        <View style={styles.containerInput}>
          <NumericInput/>
        </View>
      </View>   
    </View>
  )
}

export default ProductCard

const styles = StyleSheet.create({
    container: {
        height: hp('12.45%'),
        width: wp('79%'),
        borderWidth: 1,
        borderRadius: moderateScale(13),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.primary.gray
    },
    box: {
      height: '80%',
      width: '95%',
      flexDirection: 'row',
      gap: 6,
    },
    containerImage: {
      width: '30%',
      height: '100%',
      backgroundColor: COLORS.primary.gray,
      borderRadius: moderateScale(8),
      overflow: 'hidden', 
    },
    defaultImageStyle: {
      width: '100%',
      height: '100%',
    },
    containerText: {
      width: '50%',
      height: '100%',
      justifyContent: 'space-between'
    },
    containerName: {
      width: '100%',
      height: '30%',
    },
    productName: {
      fontFamily: FONTS.Poppins.semiBold,
      fontWeight: '600',
      lineHeight: moderateScale(24),
      fontSize: moderateScale(14),
      color: COLORS.primary.black,
    },
    productQuantity: {
      fontFamily: FONTS.Poppins.regular,
      fontWeight: '400',
      fontSize: moderateScale(11),
      lineHeight: moderateScale(24),
      color: COLORS.primary.gray
    },
    containerAmount: {
      height: '40%',
      width: '100%',
      justifyContent: 'flex-end'
    },
    productAmount: {
      fontFamily: FONTS.Poppins.semiBold,
      fontWeight: '700',
      fontSize: moderateScale(14),
      lineHeight: moderateScale(24),
      color: COLORS.primary.black,
    },
    containerInput: {
      width: '15%',
      height:'100%',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }
})