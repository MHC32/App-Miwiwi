import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { horizontalScale, moderateScale, verticalScale } from '../../../utils/responsive'
import { COLORS } from '../../../theme/palette'
import { FONTS } from '../../../theme/fonts'

const TITLE = [
  { title: 'employee', label: 'Employé' },
  { title: 'adresse', label: 'Adresse' },
  { title: 'adresseStore', label: 'Adresse Store' },
  { title: 'statutEmployé', label: 'Statut Employé'},
  { title: 'identifiant', label: 'Identifiant'},
]

const EmployeeProfile = ({ employeeData = {} }) => {
  return (
    <View style={styles.container}>
      {TITLE.map((item, index) => (
        <View 
          key={item.title}
          style={[
            styles.conatainerText,
            index === TITLE.length - 1 && styles.noBorderBottom
          ]}
        >
          <Text style={styles.TextTitle}>{item.label}</Text>
          <Text style={styles.TextValue}>{employeeData[item.title] || '-'}</Text>
        </View>
      ))}
    </View>
  )
}

export default EmployeeProfile

const styles = StyleSheet.create({
    container: {
       width: horizontalScale(342),
       borderWidth: 1,
       borderColor: COLORS.primary.gray,
       borderRadius: moderateScale(9),
    },
    conatainerText: {
        flexDirection: 'row',
        height: verticalScale(52),
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: horizontalScale(10),
        paddingRight: horizontalScale(10),
        borderBottomWidth: 1,
        borderBottomColor: COLORS.primary.gray,
    },
    noBorderBottom: {
        borderBottomWidth: 0,
    },
    TextTitle: {
        fontFamily: FONTS.Poppins.bold,
        fontSize: moderateScale(11),
        fontWeight: '700',
        lineHeight: '100%',
    },
    TextValue: {
        fontFamily: FONTS.Poppins.medium,
        fontSize: moderateScale(11),
        fontWeight: '500',
        lineHeight: '100%',
        textAlign: 'right',
        color: COLORS.primary.gray,
    },
})