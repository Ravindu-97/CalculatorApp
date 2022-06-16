import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const App = () => {

  const [resultText, setResultText] = useState('');
  const [calculationText, setCalculationText] = useState('');

  let rows = [];
  let numbers = [[7,8,9], [4,5,6], [1,2,3], ['.',0,'=']];
  
  for(let i = 0; i < 4; i++) {

    let row = []
    for(let j = 0; j < 3; j++) {
      row.push(
        <TouchableOpacity key={Math.random()} onPress={() => onButtonPress(numbers[i][j])} style={styles.btn}>
          <Text style={styles.btnText}>{numbers[i][j]}</Text>
        </TouchableOpacity>
      )
    }
    rows.push(
      <View key={Math.random()} style={styles.row}>{row}</View>
    )
  }

  let operations = ['C','Del', '+', '-', '*', '/'];
  let ops = [];

  for(let i = 0; i < 6; i++) {
    ops.push(
      <TouchableOpacity key={Math.random()} onPress={() => onOperate(operations[i])} style={styles.btn}>
        <Text style={styles.operationButtonText}>{operations[i]}</Text>
      </TouchableOpacity>
    )
  }

  const onButtonPress = (text) => {

    if(text == '='){
      return validate() && calculateResult();
    }

    const result = resultText.split('')
    if(result.includes('.') && text == '.') {
      return null
    }
    setResultText(resultText + text);
  }
  
  const onOperate = (operation) => {
    switch(operation){
      case 'Del':
        let text = resultText.split('')
        text.pop()
        setResultText(text.join(''))
        setCalculationText('')
        break;

      case 'C':
        setResultText('')
        setCalculationText('')
        break

      case '+' :
      case '-' :
      case '*' :
      case '/' :
        const lastCharacter = resultText.split('').pop();
        
        if(operations.indexOf(lastCharacter) != -1){
          return null
        }
        
        if(resultText == '') {
          return null
        } 
        
        setResultText(
          resultText + operation
        )
    }
  }

  const calculateResult = () => {

    const text = resultText;
    setCalculationText(eval(text));
  }

  const validate = () => {
    const text = resultText;

    switch(text.slice(-1)){
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }

    return true;
  }

  return (
    <View style={styles.container}>

      <View style={styles.result}>
        <Text style={styles.resultText}>
            {resultText}
        </Text>
      </View>

      <View style={styles.calculation}>
        <Text style={styles.calculationText}>{calculationText}</Text>
      </View>

      <View style={styles.buttons}>
        <View style={styles.numbers}>
          {rows} 
        </View>
        <View style={styles.operations}>
          {ops}
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue'
  },
  result: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#d5eeeb'
  },
  resultText:{
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black'
  },
  calculationText:{
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black'
  },
  calculation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#b0ded8'
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
    backgroundColor: 'pink'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#1ee9b4'
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 3
  },
  btnText: {
    fontSize: 30
  },

  operationButtonText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#636363',
  }
  
});

export default App;
