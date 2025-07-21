import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { wp, hp } from '../../utils/dimensions';
import { FONTS } from '../../theme/fonts';
import { COLORS } from '../../theme/palette';
import { useSelector } from 'react-redux';
import { selectCurrentStore } from '../../store/slices/storeSlice';
import DateRangeSection from '../../components/core/sections/DateRangeSection';

const Home = () => {
  const currentStore = useSelector(selectCurrentStore);
  console.log('Current Store:', currentStore);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(1)), // Premier jour du mois
    endDate: new Date() // Date actuelle
  });

  console.log('Current Store:', currentStore);
  console.log('Date Range:', dateRange);

  const handleDateRangeChange = (newDates) => {
    setDateRange(prev => ({
      ...prev,
      ...newDates
    }));

    // Exemple: Rafraîchir les données ici
    // fetchData(newDates.startDate, newDates.endDate);
  };
  return (
    <View style={styles.container}>
      <DateRangeSection
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onChange={handleDateRangeChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.common.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: wp('15%'),
    width: wp('100%'),
  },
  title: {
    fontFamily: FONTS.Poppins.extraBold,
    fontSize: 25,
    fontWeight: '700',
    lineHeight: '160%',
    color: COLORS.common.black,
    marginLeft: wp('5%'),
  },
  storeName: {
    fontFamily: FONTS.Poppins.semiBold,
    fontSize: 20,
    color: COLORS.primary.main,
    marginLeft: wp('5%'),
    marginTop: hp('1%'),
  }
})

export default Home