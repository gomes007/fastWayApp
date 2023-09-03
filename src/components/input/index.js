import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from './styles'
import FeatherIcon from 'react-native-vector-icons/Feather'

export function Input({label, isPassword, onPress, showPassword, ...rest}) {

    return (
        <View>

            <View style={styles.container}>
                <TextInput
                    {...rest}
                    style={styles.textInput}
                />
                {
                    isPassword &&
                    <TouchableOpacity onPress={onPress}>
                        <FeatherIcon name={showPassword ? 'eye' : 'eye-off'} size={25} color="#5BD075"/>
                    </TouchableOpacity>
                }
            </View>
        </View>
    )
}

//usar {...rest} quando as propriedades sao reconhecidas pelo componente TextInput caso contrario usa props.
