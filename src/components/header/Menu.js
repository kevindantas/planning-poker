import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import styles from './menu-style';

export default class Menu extends Component {
    state  = {
        menuOpen: false,
    }

    toggleMenu = (e) => {
        console.log(e, this);
        this.setState({
            menuOpen: true,
        })
    }

    render() {
        const { menuOpen } = this.state;
        return (
            <div class={styles.menu}>
                <button onClick={this.toggleMenu}>Abrir- Menu</button>
                <nav class={menuOpen ? styles.active : ''}>
                    <ul>
                        <li><Link activeClassName={styles.active} href="/fibonacci">Fibonacci</Link></li>
                    </ul>
                </nav>
                <div class={styles.active}></div>
            </div>
        );
    }
}
