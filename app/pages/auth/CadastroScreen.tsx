import React, { useState } from 'react';
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

// Definindo a interface para os dados do formulário
interface FormData {
  name: string;
  email: string;
  password: string;
  csenha: string;
  birthDate: string;
  gender: string;
  flagUserType: number;
  telephone: string;
  musicalGenre: string;
  cpf: string;
  cnpj: string;
}

const CadastroScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    csenha: '',
    birthDate: '',
    gender: '',
    flagUserType: 1,
    telephone: '',
    musicalGenre: '',
    cpf: '',
    cnpj: '',
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Máscaras de formatação
  const applyMask = (value: string, pattern: string): string => {
    let i = 0;
    const v = value.toString().replace(/\D/g, '');
    return pattern.replace(/#/g, () => v[i++] || '');
  };

  const handleChange = (name: keyof FormData, value: string) => {
    // Aplica máscaras conforme o campo
    let formattedValue = value;
    if (name === 'telephone') {
      formattedValue = applyMask(value, '(##) #####-####');
    } else if (name === 'cpf') {
      formattedValue = applyMask(value, '###.###.###-##');
    } else if (name === 'cnpj') {
      formattedValue = applyMask(value, '##.###.###/####-##');
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleUserTypeChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      flagUserType: value,
      cpf: value !== 3 ? prev.cpf : '',
      cnpj: value === 3 ? prev.cnpj : '',
      musicalGenre: value === 2 ? prev.musicalGenre : '',
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: string[] = [];

    // Validações básicas
    if (!formData.name) newErrors.push('Nome é obrigatório');
    if (!formData.email) newErrors.push('Email é obrigatório');
    if (!formData.password) newErrors.push('Senha é obrigatória');
    if (formData.password !== formData.csenha) {
      newErrors.push('As senhas não coincidem');
    }

    // Validações específicas por tipo de usuário
    if ([1, 2].includes(formData.flagUserType)) {
      if (!formData.cpf || formData.cpf.length < 14) {
        newErrors.push('CPF inválido');
      }
      if (formData.flagUserType === 2 && !formData.musicalGenre) {
        newErrors.push('Gênero musical é obrigatório para amantes de música');
      }
    } else if (formData.flagUserType === 3) {
      if (!formData.cnpj || formData.cnpj.length < 18) {
        newErrors.push('CNPJ inválido');
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      // Simulação do envio dos dados
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      
      router.push('/pages/auth/login');
      
    } catch (error) {
      console.error('Erro:', error);
      Alert.alert('Erro', 'Erro ao realizar cadastro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
       <View style={styles.customHeader}>
          
          <Text style={styles.title}>Criar Conta</Text>
          <View style={{ width: 40 }} />
        </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header personalizado */}
       

        {errors.length > 0 && (
          <View style={styles.errorContainer}>
            {errors.map((error, index) => (
              <Text key={index} style={styles.errorText}>
                {error}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.formContainer}>
          {/* Dados Básicos */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            
            <TextInput
              placeholder="Nome Completo"
              placeholderTextColor="#999"
              value={formData.name}
              onChangeText={(text) => handleChange('name', text)}
              style={styles.input}
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor="#999"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />

            <TextInput
              placeholder="Senha"
              placeholderTextColor="#999"
              value={formData.password}
              onChangeText={(text) => handleChange('password', text)}
              secureTextEntry
              style={styles.input}
            />

            <TextInput
              placeholder="Confirmar Senha"
              placeholderTextColor="#999"
              value={formData.csenha}
              onChangeText={(text) => handleChange('csenha', text)}
              secureTextEntry
              style={styles.input}
            />

            <TextInput
              placeholder="Data de Nascimento (dd/mm/aaaa)"
              placeholderTextColor="#999"
              value={formData.birthDate}
              onChangeText={(text) => handleChange('birthDate', text)}
              style={styles.input}
            />

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.gender}
                onValueChange={(itemValue) => handleChange('gender', itemValue as string)}
                style={styles.picker}
              >
                <Picker.Item label="Selecione o gênero" value="" />
                <Picker.Item label="Masculino" value="M" />
                <Picker.Item label="Feminino" value="F" />
                <Picker.Item label="Outro" value="O" />
              </Picker>
            </View>

            <TextInput
              placeholder="Telefone"
              placeholderTextColor="#999"
              value={formData.telephone}
              onChangeText={(text) => handleChange('telephone', text)}
              keyboardType="phone-pad"
              style={styles.input}
            />
          </View>

          {/* Tipo de Usuário */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tipo de Usuário</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.flagUserType}
                onValueChange={handleUserTypeChange}
                style={styles.picker}
              >
                <Picker.Item label="Músico" value={1} />
                <Picker.Item label="Amante de Música" value={2} />
                <Picker.Item label="Produtor" value={3} />
              </Picker>
            </View>
          </View>

          {/* Campos específicos por tipo de usuário */}
          {[1, 2].includes(formData.flagUserType) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações Adicionais</Text>
              
              <TextInput
                placeholder="CPF"
                placeholderTextColor="#999"
                value={formData.cpf}
                onChangeText={(text) => handleChange('cpf', text)}
                keyboardType="numeric"
                style={styles.input}
              />

              {formData.flagUserType === 2 && (
                <View style={styles.pickerContainer}>
                  <Text style={styles.label}>Estilo musical favorito</Text>
                  <Picker
                    selectedValue={formData.musicalGenre}
                    onValueChange={(itemValue) => handleChange('musicalGenre', itemValue as string)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Selecione o estilo musical" value="" />
                    <Picker.Item label="Rock" value="Rock" />
                    <Picker.Item label="Sertanejo" value="Sertanejo" />
                    <Picker.Item label="Pop" value="Pop" />
                    <Picker.Item label="Hip Hop" value="Hip_Hop" />
                    <Picker.Item label="Jazz" value="Jazz" />
                    <Picker.Item label="Blues" value="Blues" />
                    <Picker.Item label="Clássica" value="Classical" />
                    <Picker.Item label="Eletrônica" value="Electronic_Dance_Music" />
                    <Picker.Item label="Country" value="Country" />
                    <Picker.Item label="Reggae" value="Reggae" />
                    <Picker.Item label="Funk" value="Funk" />
                    <Picker.Item label="Disco" value="Disco" />
                    <Picker.Item label="Gospel" value="Gospel" />
                    <Picker.Item label="Todos" value="Todos" />
                  </Picker>
                </View>
              )}
            </View>
          )}

          {formData.flagUserType === 3 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informações da Empresa</Text>
              
              <TextInput
                placeholder="CNPJ"
                placeholderTextColor="#999"
                value={formData.cnpj}
                onChangeText={(text) => handleChange('cnpj', text)}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          )}

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.submitButtonText}>Criar Conta</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => router?.push('/pages/auth/login')}>
              <Text style={styles.loginLink}>Faça login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop:15,
    padding: 20,
    paddingBottom: 40,
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(236, 209, 130, 0.2)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ECD182',
    textAlign: 'center',
    flex: 1,
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 5,
    fontSize: 14,
  },
  formContainer: {
    width: '100%',
  },
  section: {
    borderWidth: 1,
    borderColor: '#ECD182',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    backgroundColor: 'rgba(236, 209, 130, 0.05)',
  },
  sectionTitle: {
    color: '#ECD182',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  label: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: 'rgba(47, 47, 47, 0.7)',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
  },
  picker: {
    height: 50,
    color: '#FFF',
  },
  submitButton: {
    backgroundColor: '#ECD182',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 25,
    shadowColor: '#ECD182',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: '#999',
    fontSize: 14,
  },
  loginLink: {
    color: '#ECD182',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default CadastroScreen;