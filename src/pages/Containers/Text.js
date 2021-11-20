import React from 'react';
import ReactDOM from 'react-dom';
import ROUTE from "../../config/route";
import domain from '../../config/api/domain';
import { connect } from 'react-redux';
import Default from '../../config/translation/default.json'
import { renderToString } from 'react-dom/server';

const Text = (props) => {
    const { Key, translation } = props;
    const text = (translation && translation[Key]) ?? Default[Key]

    return text;
}

const mapSateToProps = state => ({
    translation: state.translation?.active?.data,
})



export default connect(mapSateToProps, {})(Text);
