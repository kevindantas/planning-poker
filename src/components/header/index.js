import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';
import Menu from './Menu';

export default class Header extends Component {
	render() {
		return (
			<header class={style.header}>
				<Menu />
				<h1>Preact App</h1>
			</header>
		);
	}
}
