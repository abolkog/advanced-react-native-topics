import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, List, Icon } from 'react-native-elements';
import languages from '../../locales/languages.json';
import Colors from '../constants/Colors';

class LanguageScreen extends Component {
    state = {
        code: 'en'
    }

    showRighIcon(lang) {
        if (lang.locale === this.state.code) {
            return <Icon type='ionicon' name='ios-checkmark-circle' size={25} color={Colors.red}/>;
        }

        return <Icon type='ionicon' name='ios-globe' size={25} color={Colors.grey} />;
    }

    onSelectLang(lang) {
        this.setState({ code: lang.locale });
    }

    render() {
        return (
            <View style={styles.container}>
                <List>
                {
                    languages.map((lang) => {
                        return (
                            <ListItem 
                                key={lang.id}
                                title={lang.name}
                                rightIcon={this.showRighIcon(lang)}
                                onPress={this.onSelectLang.bind(this, lang)}
                            />
                        );
                    })
                }
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default LanguageScreen;
