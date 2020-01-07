import React from 'react';
import PropTypes from 'prop-types';
import {get} from 'lodash';
import TextInput from './TextInput';
import InputWrapper from './InputWrapper';
import TagList from './TagList';

import {gettext, KEYCODES} from 'utils';

/**
 * @ngdoc react
 * @name KeywordInput
 * @description Component to select tags like Keyword of a news story
 */
class KeywordInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = { inputText: '' };

        this.addKeyword = this.addKeyword.bind(this);
        this.removeKeyword = this.removeKeyword.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    addKeyword() {
        if (!this.state.inputText) {
            return;
        }

        // If value is not currently in the list of keywords
        // Then call onChange with the new set of keywords
        if (this.props.value.indexOf(this.state.inputText) === -1) {
            const newValue = this.props.value ?
                [...this.props.value, this.state.inputText] :
                [this.state.inputText];

            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: newValue
                }
            });
            this.setState({ inputText: '' });
        } else {
            this.setState({ inputText: ''});
        }
    }

    removeKeyword(index) {
        const newValue = [...this.props.value];

        newValue.splice(index, 1);
        this.props.onChange({
            target: {
                name: this.props.name,
                value: newValue
            }
        });
    }

    inputChange(event) {
        this.setState({ inputText: get(event, 'target.value')});
    }

    render() {
        const {name, label, value, error} = this.props;

        return (
            <InputWrapper error={error} name={name}>
                <div><label htmlFor={name}>{
                    gettext('Keywords (Type and press ENTER to add a keyword)')}</label></div>
                <TagList
                    tags={value}
                    icon='icon--close-thin'
                    onClick={this.removeKeyword} />
                <TextInput
                    onChange={this.inputChange}
                    onKeyDown={(event) => {
                        if (event.keyCode === KEYCODES.ENTER ||
                            event.keyCode === KEYCODES.DOWN) {
                            event.preventDefault();
                            event.stopPropagation();
                            this.addKeyword();
                        }
                    }}
                    value={this.state.inputText} />
            </InputWrapper>
        );
    }
}

KeywordInput.propTypes = {
    label: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
    name: PropTypes.string,
    error: PropTypes.object,
};

export default KeywordInput;