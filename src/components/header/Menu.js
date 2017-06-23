import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import styles from './menu-style';

export default class Menu extends Component {
    state  = {
        menuOpen: false,
    }

    toggleMenu = (e) => {
        e.stopPropagation()
        this.setState(state => ({ menuOpen: !state.menuOpen }));
    }

    render() {
        const { menuOpen } = this.state;
        return (
            <div 
                onClick={this.toggleMenu}
                class={menuOpen ? `${styles.menu} ${styles.active}` : styles.menu}>
                <button onClick={this.toggleMenu}>Abrir- Menu</button>
                <nav>
                    <ul>
                        <li><a href="#">X</a></li>
                        <li><Link activeClassName={styles.active} href="/fibonacci">Fibonacci</Link></li>
                    </ul>
                </nav>
                <div class={styles.active}></div>
            </div>
        );
    }
}
