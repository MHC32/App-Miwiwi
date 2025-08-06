import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../theme/palette'
import AmountModal from '../../components/core/Modals/AmountModal'



const index = () => {
    return (
        <View style={styles.container}>
            <AmountModal/>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.common.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
})