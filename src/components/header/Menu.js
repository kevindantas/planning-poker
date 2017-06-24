import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import styles from './menu-style';

export default class Menu extends Component {
    state  = {
        menuOpen: false,
        translateX: -window.innerWidth * 0.75,
    }

    componentDidMount() {
        document.body.addEventListener('touchstart', this.handleTouchStart);
        document.body.addEventListener('touchmove', this.handleTouchMove);
        document.body.addEventListener('touchend', this.handleTouchEnd);
    }

    componentWillUnmout() {
        document.body.removeEventListener('touchstart', this.handleTouchStart);
        document.body.removeEventListener('touchmove', this.handleTouchMove);
        document.body.removeEventListener('touchend', this.handleTouchEnd);
    }


    handleTouchStart = (e) => {
        if(e.target.className === 'close-menu') {
            return this.setState({
                translateX: -window.innerWidth * 0.75,
                menuOpen: false,
                dragging: false,
            });
        };

        const touchXStart = e.touches[0].pageX;
        if (!this.state.menuOpen && (window.innerWidth * 0.25 < touchXStart)) return;
        this.setState((state) => ({
            touchXStart,
            originalX: state.translateX,
            dragging: true,
        }));
    }

    handleTouchMove = (e) => {
        if(!this.state.dragging || e.target.className === 'close-menu') return;

        const { originalX, touchXStart, menuOpen } = this.state;
        const currentX = e.touches[0].pageX;
        
        let translateX;

        // If menu is closed nav will translate beyond the edge
	    if (!menuOpen) {
            translateX = originalX + Math.floor(currentX - touchXStart)
            if (translateX > 0) return;
        } else {
            translateX = originalX - Math.floor(currentX - touchXStart) * -1;
        }

        this.setState((state) => ({
            translateX,
        }));
    }

    handleTouchEnd = (e) => {
        if(!this.state.dragging || e.target.className === 'close-menu') return;

        const { translateX, originalX } = this.state;

        // The original position was hidden
        if(originalX < 0 && originalX * 0.75 < translateX) {
            // Set menu to open and stop dragging animations
            return this.setState({ 
                originalX: 0,
                menuOpen: true,
                dragging: false,
            });
        }

        this.setState({ 
            originalX,
            translateX: -window.innerWidth * 0.75,
            menuOpen: false,
            dragging: false,
        });
    }

    toggleMenu = (e) => {
        e.stopPropagation()
        console.log(this.state.translateX);
        this.setState(state => ({ menuOpen: !state.menuOpen }));
    }


    

    render() {
        const { menuOpen, dragging, translateX, originalX } = this.state;
        const navStyle = {
            transition: 'none',
            transform: `translateX(${translateX}px)`,
        };

        // If the menu is open is there's no dragging
        if (menuOpen && !dragging) {
            navStyle.transition = 'transform 0.2s ease-in',
            navStyle.transform = 'translateX(0)';
        }

        return (
            <div 
                onClick={this.toggleMenu}
                class={menuOpen ? `${styles.menu} ${styles.active}` : styles.menu}>
                <button onClick={this.toggleMenu}>Abrir- Menu</button>
                <nav style={navStyle}>
                    <ul>
                        <li><a href="#" class="close-menu">X</a></li>
                        <li><Link activeClassName={styles.active} href="/fibonacci">Fibonacci</Link></li>
                    </ul>
                </nav>
                <div class={styles.active}></div>
            </div>
        );
    }
}
