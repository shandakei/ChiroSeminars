import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Welcome.module.css'

export default function Welcome() {
    return (
    <section className={styles.Welcome}>
        <h2>Empowering Chiropractors in Oceania</h2>
        <p>Find the best seminars, webinars, and coaching all in one place</p>
        <button ><Link to="/Seminars">Explore All Seminars</Link></button>
        <p>Or</p>
        <SearchBar />
    </section>
    )
}
