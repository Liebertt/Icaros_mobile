import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  TextInput,
  Keyboard,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';

// --- Tipos para os dados ---
interface User {
  name: string;
  username: string;
  avatar: string;
}

interface Post {
  id: number;
  user: User;
  content: string;
  image: string | null;
  likes: number;
  comments: number;
  shares: number;
  time: string;
  isLiked: boolean;
  isSaved: boolean;
}

// --- Dados iniciais do feed (do seu design original) ---
const initialFeedData: Post[] = [
    {
      id: 1,
      user: {
        name: "Ana Souza",
        username: "@anasouz",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c2A_be9c29b29330?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      content: "Acabei de lançar minha nova música! Espero que gostem 🎵",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      likes: 245,
      comments: 32,
      shares: 15,
      time: "2h atrás",
      isLiked: false,
      isSaved: false
    },
    {
      id: 2,
      user: {
        name: "Pedro Alves",
        username: "@pedroalves",
        avatar: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      },
      content: "Gravando no estúdio hoje. Novidades em breve! 🎶 #StudioTime",
      image: null,
      likes: 189,
      comments: 15,
      shares: 8,
      time: "4h atrás",
      isLiked: true,
      isSaved: true
    },
    {
      id: 3,
      user: {
        name: "Carla Mendes",
        username: "@carlam",
        avatar: "https://cdn.alboompro.com/5fb3e0f69111f40001922f2f_64d7a97d95b53c0001643fba/large/foto-de-perfil-wonder-producoes.jpg?v=1"
      },
      content: "Que honor tocar no festival de música da cidade ano passado! Foi incrível! 🎸",
      image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      likes: 512,
      comments: 47,
      shares: 29,
      time: "1d atrás",
      isLiked: false,
      isSaved: false
    }
];

// Dados do usuário atual para os novos posts
const currentUser: User = {
  name: "Carlos Silva",
  username: "@carloss",
  avatar: "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=785&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
};


const FeedScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('forYou');
  const [activeBottom, setActiveBottom] = useState('feed');
  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>(initialFeedData);
  const [newPostContent, setNewPostContent] = useState<string>('');
  const [isPosting, setIsPosting] = useState(false);
  const [newPostImage, setNewPostImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewPostImage(result.assets[0].uri);
    }
  };

  const handlePostSubmit = () => {
    if (!newPostContent.trim() && !newPostImage) return;

    const newPost: Post = {
      id: Date.now(),
      user: currentUser,
      content: newPostContent,
      image: newPostImage,
      likes: 0,
      comments: 0,
      shares: 0,
      time: "agora mesmo",
      isLiked: false,
      isSaved: false,
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewPostImage(null);
    setIsPosting(false); 
    Keyboard.dismiss();
  };
  
  const cancelPost = () => {
    setIsPosting(false);
    setNewPostContent('');
    setNewPostImage(null);
  };


  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setPosts(initialFeedData);
      setRefreshing(false);
    }, 1500);
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } : post
    ));
  };

  const handleSave = (id: number) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, isSaved: !post.isSaved } : post
    ));
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.user.avatar }} style={styles.userAvatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.userUsername}>{item.user.username} • {item.time}</Text>
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {item.content ? <Text style={styles.postContent}>{item.content}</Text> : null}

      {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}

      <View style={styles.postStats}>
        <View style={styles.statItem}>
          <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.actionButton}>
            <Ionicons name={item.isLiked ? "heart" : "heart-outline"} size={20} color={item.isLiked ? "#ECD182" : "#666"} />
          </TouchableOpacity>
          <Text style={styles.statText}>{item.likes}</Text>
        </View>
        <View style={styles.statItem}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#666" />
          </TouchableOpacity>
          <Text style={styles.statText}>{item.comments}</Text>
        </View>
        <View style={styles.statItem}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="arrow-redo-outline" size={20} color="#666" />
          </TouchableOpacity>
          <Text style={styles.statText}>{item.shares}</Text>
        </View>
        <View style={styles.statItem}>
          <TouchableOpacity onPress={() => handleSave(item.id)} style={styles.actionButton}>
            <Ionicons name={item.isSaved ? "bookmark" : "bookmark-outline"} size={20} color={item.isSaved ? "#ECD182" : "#666"} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
     
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, activeTab === 'forYou' && styles.activeTab]} onPress={() => setActiveTab('forYou')}>
          <Text style={[styles.tabText, activeTab === 'forYou' && styles.activeTabText]}>Para você</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, activeTab === 'following' && styles.activeTab]} onPress={() => setActiveTab('following')}>
          <Text style={[styles.tabText, activeTab === 'following' && styles.activeTabText]}>Seguindo</Text>
        </TouchableOpacity>
      </View>

      {isPosting ? (
        <View style={styles.createPostContainer}>
          <Image source={{ uri: currentUser.avatar }} style={styles.createPostAvatar} />
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="O que você está pensando?"
              placeholderTextColor="#666"
              value={newPostContent}
              onChangeText={setNewPostContent}
              multiline
              autoFocus={true}
            />
            {newPostImage && (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: newPostImage }} style={styles.imagePreview} />
                <TouchableOpacity style={styles.removeImageButton} onPress={() => setNewPostImage(null)}>
                   <Ionicons name="close-circle" size={24} color="rgba(0,0,0,0.7)" />
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.publishActions}>
              <TouchableOpacity onPress={pickImage}>
                <Feather name="image" size={24} color="#ECD182" />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                <TouchableOpacity style={styles.cancelButton} onPress={cancelPost}>
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.publishButton, (!newPostContent.trim() && !newPostImage) && styles.publishButtonDisabled]}
                  onPress={handlePostSubmit}
                  disabled={!newPostContent.trim() && !newPostImage}
                >
                  <Text style={styles.publishButtonText}>Publicar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <TouchableOpacity style={styles.createPostButton} onPress={() => setIsPosting(true)}>
          <Image
            source={{ uri: currentUser.avatar }}
            style={styles.createPostAvatar}
          />
          <Text style={styles.createPostText}>O que você está pensando?</Text>
          <Feather name="image" size={20} color="#ECD182" style={styles.mediaIcon} />
        </TouchableOpacity>
      )}

      <View style={styles.feedContainer}>
        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={onRefresh} 
              colors={['#ECD182']} 
              tintColor="#ECD182" 
            />
          }
          contentContainerStyle={styles.feedContent}
        />
      </View>

      <View style={styles.bottomNav}>
         <TouchableOpacity onPress={() => setActiveBottom('feed')} style={styles.navItem}>
          <Ionicons name="home" size={28} color={activeBottom === 'feed' ? "#ECD182" : "#666"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Explorar')} style={styles.navItem}>
          <Ionicons name="search" size={28} color={activeBottom === 'explore' ? "#ECD182" : "#666"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Criar Post')} style={styles.navItem}>
          <Ionicons name="add-circle-outline" size={36} color="#ECD182" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/pages/profile')} style={styles.navItem}>
          <Image
            source={{ uri: currentUser.avatar }}
            style={[
              styles.profileImage, 
              { borderColor: activeBottom === 'profile' ? "#ECD182" : "#666" }
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000'
  },
  tabsContainer: { 
    flexDirection: 'row', 
    borderBottomWidth: 1, 
    borderBottomColor: '#1C1C1C' 
  },
  tab: { 
    flex: 1, 
    paddingVertical: 16, 
    alignItems: 'center' 
  },
  activeTab: { 
    borderBottomWidth: 2, 
    borderBottomColor: '#ECD182' 
  },
  tabText: { 
    color: '#666', 
    fontSize: 16, 
    fontWeight: '500' 
  },
  activeTabText: { 
    color: '#ECD182' 
  },
  createPostButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    borderBottomWidth: 8, 
    borderBottomColor: '#000' 
  },
  createPostText: { 
    flex: 1, 
    color: '#666', 
    fontSize: 16 
  },
  mediaIcon: { 
    marginLeft: 12 
  },
  createPostContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#000',
    gap: 12,
  },
  createPostAvatar: { 
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    marginRight: 12, 
  },
  textInputContainer: {
    flex: 1,
  },
  textInput: {
    color: '#FFF',
    fontSize: 16,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  publishActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontWeight: 'bold',
  },
  publishButton: {
    backgroundColor: '#ECD182',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  publishButtonDisabled: {
    backgroundColor: '#666',
  },
  publishButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  feedContainer: {
    flex: 1,
    marginBottom: 60,
  },
  feedContent: {
    paddingBottom: 20,
  },
  postCard: { 
    backgroundColor: '#1C1C1C', 
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  postHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  userAvatar: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 12 
  },
  userInfo: { 
    flex: 1 
  },
  userName: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 2 
  },
  userUsername: { 
    color: '#666', 
    fontSize: 14 
  },
  moreButton: { 
    padding: 4 
  },
  postContent: { 
    color: '#FFF', 
    fontSize: 15, 
    lineHeight: 20, 
    marginBottom: 12 
  },
  postImage: { 
    width: '100%', 
    height: 200, 
    borderRadius: 8, 
    marginTop: 4,
    marginBottom: 12 
  },
  postStats: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    borderTopWidth: 1, 
    borderTopColor: '#2A2A2A', 
    paddingTop: 12, 
    marginTop: 8 
  },
  statItem: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  actionButton: { 
    padding: 8 
  },
  statText: { 
    color: '#666', 
    fontSize: 14, 
    marginLeft: 4 
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
    justifyContent: 'center' 
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
  },
  // --- NOVOS ESTILOS PARA A PRÉ-VISUALIZAÇÃO DA IMAGEM ---
  imagePreviewContainer: {
    marginTop: 10,
    position: 'relative',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'white',
    borderRadius: 12,
  },
});

export default FeedScreen;

