import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItem, List, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { changeLocale } from '../actions';
import languages from '../../locales/languages.json';
import Colors from '../constants/Colors';


class LanguageScreen extends Component {
    
    static navigationOptions = ({ screenProps }) => { 
        const { I18n } = screenProps;
        const title = I18n.t('language.screen_title');
        return {
            title
        };
    }

    showRighIcon(lang) {
        if (lang.locale === this.props.locale) {
            return <Icon type='ionicon' name='ios-checkmark-circle' size={25} color={Colors.red}/>;
        }

        return <Icon type='ionicon' name='ios-globe' size={25} color={Colors.grey} />;
    }

    onSelectLang(lang) {
       this.props.changeLocale(lang.locale);
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

const maptStateToProps = ({ language }) => {
    return {
        locale: language.locale
    };
};
export default connect(maptStateToProps, { changeLocale })(LanguageScreen);
