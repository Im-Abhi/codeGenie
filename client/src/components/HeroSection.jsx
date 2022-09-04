import React from "react";
import styles from "./HeroSection.module.scss";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section>
            <div className={styles.wrapper}>
                <div>
                    <p>
                        Bring out the best in you & have safe and collaborative
                        sessions with
                        <span> Code Genie</span>
                    </p>
                    <p className={styles.subSection}>
                        Run your code with our fast paced IDE to get yourself
                        rid of nuisances of setting up your local development
                        environment With our wide support of languages Code
                        Genie ensures that you spend your time on coding rather
                        than on setting up development environment.
                    </p>
                    <Link to="/editor">
                        <button>Try our IDE now</button>
                    </Link>
                </div>
                <div>
                    <img src="/hero.png" alt="hero" />
                </div>
            </div>
            <div className={styles.glassMorphism}>
                <h2>Our IDE provide integration for</h2>
                <div className={styles.container}>
                    <div>
                        <img src="/c++.png" alt="cpp" />
                        <span>c++</span>
                    </div>
                    <div>
                        <img src="/python.png" alt="python" />
                        <span>python</span>
                    </div>
                    <div>
                        <img src="/js.png" alt="javascript" />
                        <span>javascript</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
