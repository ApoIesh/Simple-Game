import React from 'react';
import {View, Text, Button, TouchableOpacity, Platform} from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';
import styles, {hp, wp} from './style/styles';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIds: [],
      remainingSeconds: this.props.initialSeconds,
    };
  }

  gameStatus = 'PLAYING';

  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };

  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(
    () => 1 + Math.floor(10 * Math.random()),
  );

  Target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  shuffledRandomNumbers = shuffle(this.randomNumbers);

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(
        prevState => {
          return {remainingSeconds: prevState.remainingSeconds - 1};
        },
        () => {
          if (this.state.remainingSeconds === 0) {
            clearInterval(this.intervalId);
          }
        },
      );
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  isNumberSelected = numberIndex => {
    return this.state.selectedIds.indexOf(numberIndex) >= 0;
  };

  selectNumber = numberIndex => {
    this.setState(prevState => ({
      selectedIds: [...prevState.selectedIds, numberIndex],
    }));
  };

  componentWillUpdate(nextProps, netxState) {
    if (
      netxState.selectedIds !== this.state.selectedIds ||
      netxState.remainingSeconds === 0
    ) {
      this.gameStatus = this.calcGameStatus(netxState);
      if (this.gameStatus !== 'PLAYING') {
        clearInterval(this.intervalId);
      }
    }
  }

  calcGameStatus = netxState => {
    const sumSelected = netxState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);
    if (netxState.remainingSeconds === 0) {
      return 'LOST';
    }
    if (sumSelected < this.Target) {
      return 'PLAYING';
    }
    if (sumSelected === this.Target) {
      return 'WON';
    }
    if (sumSelected > this.Target) {
      return 'LOST';
    }
  };

  render() {
    const gameStatus = this.gameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>
          {this.Target}
        </Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((randomNumber, index) => (
            <RandomNumber
              key={index}
              id={index}
              number={randomNumber}
              isDisabled={
                this.isNumberSelected(index) || gameStatus !== 'PLAYING'
              }
              onPress={this.selectNumber}
            />
          ))}
        </View>
        {this.gameStatus !== 'PLAYING' && (
          <TouchableOpacity
            style={styles.resetGame}
            onPress={this.props.onPlayAgain}>
            <Text style={styles.resetText}>Play Again</Text>
          </TouchableOpacity>
        )}
        <View
          style={{
            marginBottom: Platform.OS === 'ios' ? hp(2) : hp(1),
            marginStart: wp(2),
          }}>
          <Text style={styles.resetText}>
            {this.gameStatus} {this.state.remainingSeconds}
          </Text>
        </View>
      </View>
    );
  }
}

export default Game;
