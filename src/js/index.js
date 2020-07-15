import game from './game/game';
import { log } from './logger/logger';
import styles from '../styles/base.css';

log('Styles loaded', styles);

document.addEventListener('DOMContentLoaded', () => {
  game();
});
