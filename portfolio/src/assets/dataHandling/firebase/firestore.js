import { db } from "./config";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

// Utility function to get a collection reference
const getCollectionRef = (collectionName) => collection(db, collectionName);

/**
 * Add a document with a random ID to any collection.
 * @param {string} collectionName - The name of the collection.
 * @param {Object} data - The data to set.
 * @returns {Promise<string>} - The auto-generated document ID.
 */
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(getCollectionRef(collectionName), data);
    console.log(`Document added with ID: ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error(`Error adding document to ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Get a document from any collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document.
 * @returns {Promise<Object>} - The document data.
 */
export const getDocument = async (collectionName, docId) => {
  try {
    const docSnap = await getDoc(doc(getCollectionRef(collectionName), docId));
    if (docSnap.exists()) {
      return { id: docId, ...docSnap.data() };
    } else {
      console.log(`No such document: ${docId} in ${collectionName}`);
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching document ${docId} from ${collectionName}:`,
      error
    );
    throw error; 
  }
};

/**
 * Get all documents from a collection.
 * @param {string} collectionName - The name of the collection.
 * @returns {Promise<Array>} - An array of documents.
 */
export const getAllDocuments = async (collectionName) => {
  try {
    const snapshot = await getDocs(getCollectionRef(collectionName));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error fetching documents from ${collectionName}:`, error);
    throw error; 
  }
};

/**
 * Update a document in any collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document.
 * @param {Object} data - The data to update.
 */
export const updateDocument = async (collectionName, docId, data) => {
  try {
    await updateDoc(doc(getCollectionRef(collectionName), docId), data);
  } catch (error) {
    console.error(
      `Error updating document ${docId} in ${collectionName}:`,
      error
    );
    throw error; 
  }
};

/**
 * Delete a document from any collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} docId - The ID of the document.
 */
export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(getCollectionRef(collectionName), docId));
  } catch (error) {
    console.error(
      `Error deleting document ${docId} from ${collectionName}:`,
      error
    );
    throw error; 
  }
};

// --- Specific Collection Handlers ---

// About Collection
export const addAbout = (data) => addDocument("About", data);
export const getAbout = (docId) => getDocument("About", docId);
export const getAbouts = () => getAllDocuments("About");
export const updateAbout = (docId, data) =>
  updateDocument("About", docId, data);

// Skills Collection
export const addSkill = (data) => addDocument("Skills", data);
export const getSkills = () => getAllDocuments("Skills");
export const deleteSkill = (docId) => deleteDocument("Skills", docId);

// Projects Collection
export const addProject = (data) => addDocument("Projects", data);
export const getProjects = () => getAllDocuments("Projects");
export const getProject = (docId) => getDocument("Projects", docId);
export const updateProject = (docId, data) =>
  updateDocument("Projects", docId, data);
export const deleteProject = (docId) => deleteDocument("Projects", docId);
