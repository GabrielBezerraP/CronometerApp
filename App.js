import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempo: 0,
      botaoName: 'GO!'
    };
    this.textoResultado = null;
    this.timer = null;
    this.go = this.go.bind(this);
    this.limpar = this.limpar.bind(this);
    this.ultimoTempo = null;
  }

  go() {
    if (this.timer != null) {

      clearInterval(this.timer);
      this.timer = null;
      this.setState({ botaoName: 'GO!' })
    } else {
      this.timer = setInterval(() => {
        this.setState({ tempo: this.state.tempo + 0.1 })
      }, 100);

      this.setState({ botaoName: 'Pausa' })
    }
  }

  limpar() {
    this.calculaTempo(this.state.tempo)
    this.setState({ tempo: 0 })
    clearInterval(this.timer);
    this.timer = null;
    this.setState({ botaoName: 'GO!' })
  }

  calculaTempo(tempo) {
    if (tempo > 0) {
      const hours = Math.floor(tempo / 3600);
      const minutes = Math.floor((tempo % 3600) / 60);
      if (hours > 0)
        this.setState({ textoResultado: 'Seu ultimo tempo foi de: ' + hours + 'H' + minutes + 'Min ' + tempo.toFixed(1) + 'Sec' })
      else if (minutes > 0)
        this.setState({ textoResultado: 'Seu ultimo tempo foi de: ' + minutes + 'Min' + tempo.toFixed(1) + 'Sec' })
      else
        this.setState({ textoResultado: 'Seu ultimo tempo foi de: ' + tempo.toFixed(1) + 'Sec' })
    }

  }



  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('./src/cronometro.png')}
          style={styles.cronometro}
        />

        <Text style={styles.timer}>{this.state.tempo.toFixed(1)}</Text>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btn}
            onPress={this.go}>
            <Text style={styles.btnTexto}> {this.state.botaoName}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={this.limpar}>
            <Text style={styles.btnTexto}> Limpar!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerResultado}>
          <Text style={styles.btnTextoResultado}>{this.state.textoResultado}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1bc4bc'
  },
  containerResultado: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 375,
    height: 70,
    marginTop: 90,
  },
  timer: {
    marginTop: -160,
    color: 'white',
    fontSize: 75,
    fontWeight: 'bold'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 135,
    height: 40
  },

  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 40,
    margin: 20,
    borderRadius: 5
  },
  btnTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1bc4bc'
  },
  btnTextoResultado: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1bc4bc',
    textAlign: 'center',
    marginTop: 25
  },

});

export default App;