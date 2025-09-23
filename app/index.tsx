import { View,Image, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" }}
      style={styles.container}
      resizeMode="cover"
    >
      {/* Overlay escuro */}
      <View style={styles.overlay} />
      
      <View style={styles.content}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
             source={require("../assets/images/Icaros-branco.png")}
             style={{ width: 80, height: 80 }}
              resizeMode="contain"
          />
          
          <Text style={styles.title}>Icaros</Text>
        </View>
        
        <Text style={styles.subtitle}>Conecte-se com grandes artistas</Text>
        <Text style={styles.description}>
          Descubra novas músicas, artistas incríveis e faça parte da comunidade musical mais vibrante
        </Text>

        {/* Botões de ação */}
        <View style={styles.buttonsContainer}>
          <Link href="/pages/auth/login" asChild>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>Fazer Login</Text>
              <Ionicons name="log-in" size={20} color="#000" />
            </TouchableOpacity>
          </Link>
          
          <Link href="/pages/auth/CadastroScreen" asChild>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Criar Conta</Text>
              <Ionicons name="person-add" size={20} color="#ECD182" />
            </TouchableOpacity>
          </Link>
        </View>

        {/* Rodapé */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Ao continuar, você concorda com nossos{' '}
            <Text style={styles.footerLink}>Termos de Serviço</Text> e{' '}
            <Text style={styles.footerLink}>Política de Privacidade</Text>
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: '#ECD182',
    marginTop: 10,
    textShadowColor: 'rgba(236, 209, 130, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
    maxWidth: 300,
  },
  primaryButton: {
    backgroundColor: '#ECD182',
    padding: 16,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#ECD182',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: 16,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ECD182',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  secondaryButtonText: {
    color: '#ECD182',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    paddingHorizontal: 20,
  },
  footerText: {
    color: '#666666',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  footerLink: {
    color: '#ECD182',
    textDecorationLine: 'underline',
  },
});