import React from 'react';
import { render } from 'react-dom';

import Layout from './VendingMachine/Layout.js';
import machine from './lib/createMachine.js';

import './global.sass';

render((
    <Layout machine={machine} />
), document.getElementById('container'));