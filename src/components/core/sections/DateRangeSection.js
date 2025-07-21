import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  FlatList,
  ScrollView,
  Platform 
} from 'react-native';
import React, { useState, useMemo } from 'react';
import { FONTS } from '../../../theme/fonts';
import { COLORS } from '../../../theme/palette';
import { horizontalScale, verticalScale, moderateScale } from '../../../utils/responsive';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateRangeSection = ({
  startDate: initialStartDate = new Date(),
  endDate: initialEndDate = new Date(),
  onChange
}) => {
  const [startDate, setStartDate] = useState(new Date(initialStartDate));
  const [endDate, setEndDate] = useState(new Date(initialEndDate));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [pickerConfig, setPickerConfig] = useState({
    range: 'start',
    part: 'day'
  });

  // Liste des mois en français
  const months = useMemo(() => [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ], []);

  // Génération des années (2000-2100)
  const years = useMemo(() => {
    const yearsList = [];
    for (let year = 2000; year <= 2100; year++) {
      yearsList.push(year);
    }
    return yearsList;
  }, []);

  const showDatePicker = (range, part) => {
    setPickerConfig({ range, part });
    
    if (part === 'day') {
      setDatePickerVisibility(true);
    } else if (part === 'month') {
      setShowMonthPicker(true);
    } else if (part === 'year') {
      setShowYearPicker(true);
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setShowMonthPicker(false);
    setShowYearPicker(false);
  };

  const handleDayConfirm = (selectedDate) => {
    const { range } = pickerConfig;
    const updatedDate = new Date(selectedDate);

    if (range === 'start') {
      setStartDate(updatedDate);
    } else {
      setEndDate(updatedDate);
    }

    onChange?.({
      startDate: range === 'start' ? updatedDate : startDate,
      endDate: range === 'end' ? updatedDate : endDate
    });

    hideDatePicker();
  };

  const handleMonthSelect = (monthIndex) => {
    const { range } = pickerConfig;
    const currentDate = range === 'start' ? startDate : endDate;
    
    const updatedDate = new Date(
      currentDate.getFullYear(),
      monthIndex,
      currentDate.getDate()
    );

    if (range === 'start') {
      setStartDate(updatedDate);
    } else {
      setEndDate(updatedDate);
    }

    onChange?.({
      startDate: range === 'start' ? updatedDate : startDate,
      endDate: range === 'end' ? updatedDate : endDate
    });

    hideDatePicker();
  };

  const handleYearSelect = (year) => {
    const { range } = pickerConfig;
    const currentDate = range === 'start' ? startDate : endDate;
    
    const updatedDate = new Date(
      year,
      currentDate.getMonth(),
      currentDate.getDate()
    );

    if (range === 'start') {
      setStartDate(updatedDate);
    } else {
      setEndDate(updatedDate);
    }

    onChange?.({
      startDate: range === 'start' ? updatedDate : startDate,
      endDate: range === 'end' ? updatedDate : endDate
    });

    hideDatePicker();
  };

  const formatDatePart = (date, part) => {
    switch (part) {
      case 'day': 
        return date.getDate().toString().padStart(2, '0');
      case 'month': 
        return date.toLocaleString('fr-FR', { month: 'short' });
      case 'year': 
        return date.getFullYear().toString();
      default: 
        return '';
    }
  };

  // Composant pour le sélecteur de mois
  const MonthPicker = () => (
    <Modal
      visible={showMonthPicker}
      animationType="slide"
      transparent={true}
      onRequestClose={hideDatePicker}
    >
      <View style={styles.modalContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerTitle}>Choisir le mois</Text>
          <ScrollView contentContainerStyle={styles.monthGrid}>
            {months.map((month, index) => (
              <TouchableOpacity
                key={index}
                style={styles.monthItem}
                onPress={() => handleMonthSelect(index)}
              >
                <Text style={styles.monthText}>{month}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity onPress={hideDatePicker} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  // Composant pour le sélecteur d'année
  const YearPicker = () => (
    <Modal
      visible={showYearPicker}
      animationType="slide"
      transparent={true}
      onRequestClose={hideDatePicker}
    >
      <View style={styles.modalContainer}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerTitle}>Choisir l'année</Text>
          <FlatList
            data={years}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.yearItem}
                onPress={() => handleYearSelect(item)}
              >
                <Text style={styles.yearText}>{item}</Text>
              </TouchableOpacity>
            )}
            getItemLayout={(data, index) => (
              { length: 50, offset: 50 * index, index }
            )}
            initialScrollIndex={years.findIndex(y => y === new Date().getFullYear())}
          />
          <TouchableOpacity onPress={hideDatePicker} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Date Range Début */}
      <View style={styles.dateRange}>
        <TouchableOpacity onPress={() => showDatePicker('start', 'day')}>
          <Text style={styles.textDate}>{formatDatePart(startDate, 'day')}</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity onPress={() => showDatePicker('start', 'month')}>
          <Text style={styles.textDate}>{formatDatePart(startDate, 'month')}</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity onPress={() => showDatePicker('start', 'year')}>
          <Text style={styles.textDate}>{formatDatePart(startDate, 'year')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.space} />

      {/* Date Range Fin */}
      <View style={styles.dateRange}>
        <TouchableOpacity onPress={() => showDatePicker('end', 'day')}>
          <Text style={styles.textDate}>{formatDatePart(endDate, 'day')}</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity onPress={() => showDatePicker('end', 'month')}>
          <Text style={styles.textDate}>{formatDatePart(endDate, 'month')}</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity onPress={() => showDatePicker('end', 'year')}>
          <Text style={styles.textDate}>{formatDatePart(endDate, 'year')}</Text>
        </TouchableOpacity>
      </View>

      {/* Picker pour les jours (utilise toujours le DateTimePickerModal) */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={pickerConfig.range === 'start' ? startDate : endDate}
        onConfirm={handleDayConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date(2000, 0, 1)}
        maximumDate={new Date(2100, 0, 1)}
        locale="fr_FR"
        confirmTextIOS="Confirmer"
        cancelTextIOS="Annuler"
        headerTextIOS={`Choisir le jour`}
        isDarkModeEnabled={false}
        display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
      />
      
      {/* Pickers personnalisés pour mois et années */}
      <MonthPicker />
      <YearPicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(350),
    height: verticalScale(100),
    justifyContent: 'space-between',
  },
  dateRange: {
    width: horizontalScale(303.52),
    height: verticalScale(55),
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    borderRadius: moderateScale(28),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  space: {
    height: verticalScale(10),
  },
  textDate: {
    fontFamily: FONTS.Poppins.semiBold,
    fontSize: moderateScale(12),
    lineHeight: moderateScale(12),
    fontWeight: '600',
    color: COLORS.common.black,
    textAlign: 'center',
  },
  divider: {
    width: moderateScale(4),
    height: moderateScale(4),
    backgroundColor: COLORS.common.black,
    borderRadius: moderateScale(2),
  },
  // Styles pour les modals personnalisés
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerContainer: {
    width: horizontalScale(300),
    backgroundColor: 'white',
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    maxHeight: verticalScale(400),
  },
  pickerTitle: {
    fontFamily: FONTS.Poppins.bold,
    fontSize: moderateScale(18),
    textAlign: 'center',
    marginBottom: verticalScale(15),
    color: COLORS.primary.main,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  monthItem: {
    width: '30%',
    padding: moderateScale(10),
    margin: moderateScale(5),
    backgroundColor: '#F5F5F5',
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  monthText: {
    fontFamily: FONTS.Poppins.regular,
    fontSize: moderateScale(14),
  },
  yearItem: {
    padding: moderateScale(15),
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    alignItems: 'center',
  },
  yearText: {
    fontFamily: FONTS.Poppins.regular,
    fontSize: moderateScale(16),
  },
  cancelButton: {
    marginTop: verticalScale(15),
    padding: moderateScale(10),
    backgroundColor: COLORS.alert.negative,
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: FONTS.Poppins.semiBold,
    fontSize: moderateScale(16),
    color: 'white',
  },
});

export default DateRangeSection;