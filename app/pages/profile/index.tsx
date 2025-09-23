import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const ProfileScreen = () => {
  const router = useRouter();
  const [activeBottom, setActiveBottom] = useState('profile');
  
  // Dados mockados do usuário
  const userData = {
    name: "Carlos Silva",
    username: "@carloss",
    bio: "Músico apaixonado por rock e produtor nas horas vagas. Amante de boa música! 🎵",
    followers: "2.5K",
    following: "356",
    posts: "124",
    profileImage: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=785&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    joinedDate: "Junho 2022"
  };

  // Posts mockados
  const userPosts = [
    {
      id: 1,
      content: "Acabamos de lançar nosso novo single! Disponível em todas as plataformas 🎸",
      likes: 245,
      comments: 32,
      time: "2 horas atrás"
    },
    {
      id: 2,
      content: "Gravando no estúdio hoje. Novidades em breve! 🎶",
      likes: 189,
      comments: 15,
      time: "1 dia atrás"
    },
    {
      id: 3,
      content: "Que honor tocar no festival de música da cidade ano passado!",
      likes: 512,
      comments: 47,
      time: "3 dias atrás"
    }
  ];

  const renderPost = ({ item }: any) => (
    <View style={styles.postCard}>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postStats}>
        <View style={styles.postStat}>
          <Ionicons name="heart" size={16} color="#666" />
          <Text style={styles.postStatText}>{item.likes}</Text>
        </View>
        <View style={styles.postStat}>
          <Ionicons name="chatbubble" size={16} color="#666" />
          <Text style={styles.postStatText}>{item.comments}</Text>
        </View>
        <Text style={styles.postTime}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
     
      <View style={styles.contentContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
     
          <View style={styles.profileHeader}>
            <Image 
              source={{ uri: userData.coverImage }} 
              style={styles.coverImage} 
            />
            <View style={styles.profileImageContainer}>
              <Image 
                source={{ uri: userData.profileImage }} 
                style={styles.profileImage} 
              />
              <TouchableOpacity style={styles.editPhotoButton}>
                <Ionicons name="camera" size={16} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

      
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userUsername}>{userData.username}</Text>
            <Text style={styles.userBio}>{userData.bio}</Text>
            <Text style={styles.joinedDate}>Entrou em {userData.joinedDate}</Text>

      
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userData.posts}</Text>
                <Text style={styles.statLabel}>Publicações</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userData.followers}</Text>
                <Text style={styles.statLabel}>Seguidores</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{userData.following}</Text>
                <Text style={styles.statLabel}>Seguindo</Text>
              </View>
            </View>

            {/* Botões de ação */}
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editProfileButton}>
                <Text style={styles.editProfileText}>Editar Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton}>
                <MaterialIcons name="message" size={20} color="#ECD182" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Separador */}
          <View style={styles.separator} />

          {/* Publicações */}
          <View style={styles.postsSection}>
            <Text style={styles.sectionTitle}>Publicações</Text>
            <FlatList
              data={userPosts}
              renderItem={renderPost}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </View>

      
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push('/pages/feed/feed')} style={styles.navItem}>
          <Ionicons name="home" size={28} color={activeBottom === 'feed' ? "#ECD182" : "#666"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Explorar')} style={styles.navItem}>
          <Ionicons name="search" size={28} color={activeBottom === 'explore' ? "#ECD182" : "#666"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Criar Post')} style={styles.navItem}>
          <Ionicons name="add-circle-outline" size={36} color="#ECD182" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveBottom('profile')} style={styles.navItem}>
          <Image
            source={{ uri: userData.profileImage }}
            style={[
              styles.profileImageNav, 
              { borderColor: activeBottom === 'profile' ? "#ECD182" : "#666" }
            ]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  contentContainer: {
    flex: 1,
    marginBottom: 60,
  },

  profileHeader: {
    position: 'relative',
    marginBottom: 70,
  },
  coverImage: {
    width: '100%',
    height: 180,
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: -60,
    left: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#000',
  },
  editPhotoButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#ECD182',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  userName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userUsername: {
    color: '#ECD182',
    fontSize: 16,
    marginBottom: 8,
  },
  userBio: {
    color: '#CCC',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 8,
  },
  joinedDate: {
    color: '#666',
    fontSize: 14,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1C1C1C',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#ECD182',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
    fontSize: 14,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  editProfileButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ECD182',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  editProfileText: {
    color: '#ECD182',
    fontWeight: '600',
  },
  messageButton: {
    width: 50,
    borderWidth: 1,
    borderColor: '#ECD182',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 8,
    backgroundColor: '#1C1C1C',
  },
  postsSection: {
    padding: 16,
  },
  sectionTitle: {
    color: '#ECD182',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  postCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  postContent: {
    color: '#FFF',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  postStatText: {
    color: '#666',
    fontSize: 14,
  },
  postTime: {
    color: '#666',
    fontSize: 12,
    marginLeft: 'auto',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#1C1C1C',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    justifyContent: 'space-around',
    alignItems: 'center',
    zIndex: 1000,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageNav: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
  },
});

export default ProfileScreen;
