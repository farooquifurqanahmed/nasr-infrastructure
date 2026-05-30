import { useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  onSnapshot 
} from 'firebase/firestore';
import { projectsData, elevations3D, servicesData, testimonials } from '../utils/mockData';

// Helper to seed localStorage if empty
const initializeLocalStorage = () => {
  if (!localStorage.getItem('nasr_projects')) {
    localStorage.setItem('nasr_projects', JSON.stringify(projectsData));
  }
  if (!localStorage.getItem('nasr_elevations')) {
    localStorage.setItem('nasr_elevations', JSON.stringify(elevations3D));
  }
  if (!localStorage.getItem('nasr_services')) {
    localStorage.setItem('nasr_services', JSON.stringify(servicesData));
  }
  if (!localStorage.getItem('nasr_testimonials')) {
    localStorage.setItem('nasr_testimonials', JSON.stringify(testimonials));
  }
  if (!localStorage.getItem('nasr_inquiries')) {
    localStorage.setItem('nasr_inquiries', JSON.stringify([
      {
        id: 'inq-mock-1',
        name: 'Ahmad Rafiq',
        email: 'ahmad@example.com',
        phone: '+971 50 123 4567',
        serviceRequired: 'Residential Construction',
        message: 'Looking to build a premium 5-bedroom villa in Dubai Hills. Please send brochures and schedule a consultation.',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
        status: 'Unread'
      },
      {
        id: 'inq-mock-2',
        name: 'Zoe Sterling',
        email: 'zoe@sterlingbrands.com',
        phone: '+1 310 987 6543',
        serviceRequired: 'Architecture Design',
        message: 'We are seeking architectural design concepts for a new boutique hotel building.',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
        status: 'Read'
      }
    ]));
  }
};

export const useFirestore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      initializeLocalStorage();
    }
  }, []);

  // ----------------------------------------------------
  // INQUIRIES API
  // ----------------------------------------------------
  const addInquiry = async (inquiryData) => {
    setLoading(true);
    try {
      const payload = {
        ...inquiryData,
        timestamp: new Date().toISOString(),
        status: 'Unread'
      };

      if (isFirebaseConfigured && db) {
        const docRef = await addDoc(collection(db, 'inquiries'), payload);
        setLoading(false);
        return { id: docRef.id, ...payload };
      } else {
        // Fallback
        const current = JSON.parse(localStorage.getItem('nasr_inquiries') || '[]');
        const newInq = { id: `inq-${Date.now()}`, ...payload };
        localStorage.setItem('nasr_inquiries', JSON.stringify([newInq, ...current]));
        setLoading(false);
        return newInq;
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  const getInquiries = (callback) => {
    if (isFirebaseConfigured && db) {
      const q = query(collection(db, 'inquiries'), orderBy('timestamp', 'desc'));
      return onSnapshot(q, (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        callback(items);
      }, (err) => {
        console.error(err);
        setError(err.message);
      });
    } else {
      // LocalStorage Sync
      initializeLocalStorage();
      const items = JSON.parse(localStorage.getItem('nasr_inquiries') || '[]');
      // Sort by timestamp desc
      items.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      callback(items);
      
      // Return dummy unsubscribe function
      return () => {};
    }
  };

  const updateInquiryStatus = async (id, status) => {
    try {
      if (isFirebaseConfigured && db) {
        const docRef = doc(db, 'inquiries', id);
        await updateDoc(docRef, { status });
      } else {
        const items = JSON.parse(localStorage.getItem('nasr_inquiries') || '[]');
        const updated = items.map(item => item.id === id ? { ...item, status } : item);
        localStorage.setItem('nasr_inquiries', JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteInquiry = async (id) => {
    try {
      if (isFirebaseConfigured && db) {
        await deleteDoc(doc(db, 'inquiries', id));
      } else {
        const items = JSON.parse(localStorage.getItem('nasr_inquiries') || '[]');
        const filtered = items.filter(item => item.id !== id);
        localStorage.setItem('nasr_inquiries', JSON.stringify(filtered));
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // ----------------------------------------------------
  // PROJECTS API
  // ----------------------------------------------------
  const getProjects = (callback) => {
    if (isFirebaseConfigured && db) {
      const q = collection(db, 'projects');
      return onSnapshot(q, (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        if (items.length === 0) {
          callback(projectsData); // fallback to static if empty database
        } else {
          callback(items);
        }
      }, (err) => {
        console.error(err);
        setError(err.message);
      });
    } else {
      initializeLocalStorage();
      const items = JSON.parse(localStorage.getItem('nasr_projects') || '[]');
      callback(items);
      return () => {};
    }
  };

  const addProject = async (proj) => {
    try {
      if (isFirebaseConfigured && db) {
        const docRef = await addDoc(collection(db, 'projects'), proj);
        return { id: docRef.id, ...proj };
      } else {
        const items = JSON.parse(localStorage.getItem('nasr_projects') || '[]');
        const newProj = { id: `proj-${Date.now()}`, ...proj };
        localStorage.setItem('nasr_projects', JSON.stringify([...items, newProj]));
        return newProj;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateProject = async (id, proj) => {
    try {
      if (isFirebaseConfigured && db) {
        const docRef = doc(db, 'projects', id);
        await updateDoc(docRef, proj);
      } else {
        const items = JSON.parse(localStorage.getItem('nasr_projects') || '[]');
        const updated = items.map(item => item.id === id ? { ...item, ...proj } : item);
        localStorage.setItem('nasr_projects', JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteProject = async (id) => {
    try {
      if (isFirebaseConfigured && db) {
        await deleteDoc(doc(db, 'projects', id));
      } else {
        const items = JSON.parse(localStorage.getItem('nasr_projects') || '[]');
        const filtered = items.filter(item => item.id !== id);
        localStorage.setItem('nasr_projects', JSON.stringify(filtered));
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // ----------------------------------------------------
  // 3D ELEVATIONS API
  // ----------------------------------------------------
  const getElevations = (callback) => {
    if (isFirebaseConfigured && db) {
      const q = collection(db, 'elevations');
      return onSnapshot(q, (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        if (items.length === 0) {
          callback(elevations3D);
        } else {
          callback(items);
        }
      });
    } else {
      initializeLocalStorage();
      const items = JSON.parse(localStorage.getItem('nasr_elevations') || '[]');
      callback(items);
      return () => {};
    }
  };

  const addElevation = async (elev) => {
    try {
      if (isFirebaseConfigured && db) {
        const docRef = await addDoc(collection(db, 'elevations'), elev);
        return { id: docRef.id, ...elev };
      } else {
        const items = JSON.parse(localStorage.getItem('nasr_elevations') || '[]');
        const newElev = { id: `elev-${Date.now()}`, ...elev };
        localStorage.setItem('nasr_elevations', JSON.stringify([...items, newElev]));
        return newElev;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateElevation = async (id, elev) => {
    try {
      if (isFirebaseConfigured && db) {
        const docRef = doc(db, 'elevations', id);
        await updateDoc(docRef, elev);
      } else {
        const items = JSON.parse(localStorage.getItem('nasr_elevations') || '[]');
        const updated = items.map(item => item.id === id ? { ...item, ...elev } : item);
        localStorage.setItem('nasr_elevations', JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteElevation = async (id) => {
    try {
      if (isFirebaseConfigured && db) {
        await deleteDoc(doc(db, 'elevations', id));
      } else {
        const items = JSON.parse(localStorage.getItem('nasr_elevations') || '[]');
        const filtered = items.filter(item => item.id !== id);
        localStorage.setItem('nasr_elevations', JSON.stringify(filtered));
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // ----------------------------------------------------
  // SERVICES API
  // ----------------------------------------------------
  const getServices = (callback) => {
    if (isFirebaseConfigured && db) {
      const q = collection(db, 'services');
      return onSnapshot(q, (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        if (items.length === 0) callback(servicesData);
        else callback(items);
      });
    } else {
      initializeLocalStorage();
      const items = JSON.parse(localStorage.getItem('nasr_services') || '[]');
      callback(items);
      return () => {};
    }
  };

  const updateService = async (id, serv) => {
    try {
      if (isFirebaseConfigured && db) {
        const docRef = doc(db, 'services', id);
        await updateDoc(docRef, serv);
      } else {
        const items = JSON.parse(localStorage.getItem('nasr_services') || '[]');
        const updated = items.map(item => item.id === id ? { ...item, ...serv } : item);
        localStorage.setItem('nasr_services', JSON.stringify(updated));
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // ----------------------------------------------------
  // TESTIMONIALS API
  // ----------------------------------------------------
  const getTestimonials = (callback) => {
    if (isFirebaseConfigured && db) {
      const q = collection(db, 'testimonials');
      return onSnapshot(q, (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        if (items.length === 0) callback(testimonials);
        else callback(items);
      });
    } else {
      initializeLocalStorage();
      const items = JSON.parse(localStorage.getItem('nasr_testimonials') || '[]');
      callback(items);
      return () => {};
    }
  };

  const addTestimonial = async (testi) => {
    try {
      if (isFirebaseConfigured && db) {
        const docRef = await addDoc(collection(db, 'testimonials'), testi);
        return { id: docRef.id, ...testi };
      } else {
        const items = JSON.parse(localStorage.getItem('nasr_testimonials') || '[]');
        const newTesti = { id: `testi-${Date.now()}`, ...testi };
        localStorage.setItem('nasr_testimonials', JSON.stringify([...items, newTesti]));
        return newTesti;
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      if (isFirebaseConfigured && db) {
        await deleteDoc(doc(db, 'testimonials', id));
      } else {
        const items = JSON.parse(localStorage.getItem('nasr_testimonials') || '[]');
        const filtered = items.filter(item => item.id !== id);
        localStorage.setItem('nasr_testimonials', JSON.stringify(filtered));
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return {
    loading,
    error,
    addInquiry,
    getInquiries,
    updateInquiryStatus,
    deleteInquiry,
    getProjects,
    addProject,
    updateProject,
    deleteProject,
    getElevations,
    addElevation,
    updateElevation,
    deleteElevation,
    getServices,
    updateService,
    getTestimonials,
    addTestimonial,
    deleteTestimonial
  };
};
