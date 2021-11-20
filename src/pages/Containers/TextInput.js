import React from 'react';
import ReactDOM from 'react-dom';
import ROUTE from "../../config/route";
import domain from '../../config/api/domain';
import { connect } from 'react-redux';
import Default from '../../config/translation/default.json'
import { renderToString } from 'react-dom/server';

const TextInput = (props) => {
    const { Key, translation } = props;
    const text = (translation && translation[Key]) ?? Default[Key]
    return (<input placeholder={text} {...props} />);
}

const mapSateToProps = state => ({
    translation: state.translation?.active?.data,
})



export default connect(mapSateToProps, {})(TextInput);
