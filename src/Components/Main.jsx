import React, { useState, useEffect } from 'react';
import './Main.scss';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Sun, Moon, Plus, Minus, RotateCcw } from 'lucide-react';

function Main() {
  // STATE VARIABLES

  // Stores the current counter value (initially 0)
  const [count, setCount] = useState(0);

  // Stores the theme preference (true = dark mode, false = light mode)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Controls whether an animation is currently playing
  const [isAnimating, setIsAnimating] = useState(false);

  // Stores the direction of the animation ('up' for increment, 'down' for decrement, 'reset' for reset)
  const [animationDirection, setAnimationDirection] = useState('');

  // EFFECT: Load the user's theme preference from localStorage or system settings when the component mounts
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme'); // Retrieve saved theme from browser storage

    // Apply the saved theme if it exists
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.body.classList.add('dark-theme'); // Apply dark mode styles
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
    }
    // If no theme is saved, check the system’s default preference
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.body.classList.add('dark-theme');
    }
  }, []); // Runs only once when the component mounts

  // FUNCTION: Toggle between light mode and dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode; // Flip the current theme state

      // Apply or remove dark theme classes from the body tag
      if (newMode) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark'); // Save the preference in localStorage
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }

      return newMode; // Update the state
    });
  };

  // FUNCTION: Trigger the animation effect based on the direction (increment, decrement, reset)
  const triggerAnimation = (direction) => {
    setAnimationDirection(direction); // Set the animation type
    setIsAnimating(true); // Start animation

    // Automatically disable animation after 300ms to allow re-triggering
    setTimeout(() => setIsAnimating(false), 300);
  };

  // FUNCTION: Increase the counter value by 1
  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1); // Update the state with the new value
    triggerAnimation('up'); // Trigger upward animation
  };

  // FUNCTION: Decrease the counter value by 1
  const decrementCount = () => {
    setCount((prevCount) => prevCount - 1); // Update the state with the new value
    triggerAnimation('down'); // Trigger downward animation
  };

  // FUNCTION: Reset the counter value to zero
  const resetCount = () => {
    setCount(0); // Reset count to initial value
    triggerAnimation('reset'); // Trigger reset animation
  };

  return (
    // Main container for the app, dynamically changes class based on theme
    <div className={`counter-app ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>

      {/* Theme Toggle Button: Allows users to switch between light and dark mode */}
      <Button
        variant={isDarkMode ? 'light' : 'dark'} // Change button style based on theme
        className="theme-toggle-btn"
        onClick={toggleTheme} // Call function to toggle theme
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'} // Accessibility label
      >
        {/* Show Sun icon for dark mode, Moon icon for light mode */}
        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      </Button>

      {/* Hero Section: Title and description of the app */}
      <header className="hero-section text-center">
        <Container>
          <h1 className="display-3 fw-bold mb-4">React Counter App</h1>
          <p className="lead mb-5">
            A beautiful and responsive counter application with theme switching & animations
          </p>
          <Button
            variant={isDarkMode ? 'outline-light' : 'outline-dark'} // Change button color based on theme
            size="lg"
            href="#counter-section" // Scrolls to the counter section
          >
            Get Started
          </Button>
        </Container>
      </header>

      {/* Counter Section: Displays the counter and control buttons */}
      <section id="counter-section" className="py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6}>
              {/* Card container with a glassmorphism effect */}
              <Card className="counter-card glassmorphism">
                <Card.Body className="text-center p-5">

                  {/* Title of the counter section */}
                  <h2 className="counter-title mb-4">Counter</h2>

                  {/* Counter Display with Animation Effect */}
                  <div
                    className={`counter-display mb-4 ${isAnimating ? `animate-${animationDirection}` : ''
                      }`}
                  >
                    <span className="counter-value">{count}</span>
                  </div>

                  {/* Counter Control Buttons */}
                  <div className="counter-buttons">

                    {/* Decrement Button: Decreases the count by 1 */}
                    <Button
                      variant=""
                      className="counter-btn me-3 glassmorphism-btn"
                      style={{ backgroundColor: '#2575fc', border: 'none' }} // Custom styling
                      onClick={decrementCount} // Calls function to decrement
                    >
                      <Minus style={{ color: '#fff' }} />
                    </Button>

                    {/* Reset Button: Resets count to zero */}
                    <Button
                      variant="secondary"
                      className="counter-btn me-3 glassmorphism-btn"
                      onClick={resetCount} // Calls function to reset
                    >
                      <RotateCcw />
                    </Button>

                    {/* Increment Button: Increases the count by 1 */}
                    <Button
                      variant=""
                      className="counter-btn glassmorphism-btn"
                      style={{ backgroundColor: '#2575fc', border: 'none' }} // Custom styling
                      onClick={incrementCount} // Calls function to increment
                    >
                      <Plus style={{ color: '#fff' }} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer Section: Displays copyright information */}
      <footer className="footer py-4 text-center">
        <Container>
          <p>© 2025 React Counter App</p>
        </Container>
      </footer>
    </div>
  );
}

export default Main;
