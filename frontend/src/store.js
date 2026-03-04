import { create } from 'zustand';

export const useStore = create((set) => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    darkMode: localStorage.getItem('darkMode') === 'true' || false,
    cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],

    setUser: (user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
        set({ user });
    },

    logout: () => {
        localStorage.removeItem('user');
        set({ user: null });
    },

    toggleDarkMode: () => set((state) => {
        const newDarkMode = !state.darkMode;
        localStorage.setItem('darkMode', newDarkMode);
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        return { darkMode: newDarkMode };
    }),

    initTheme: () => set((state) => {
        if (state.darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        return {};
    }),

    addToCart: (product) => set((state) => {
        const existingItem = state.cart.find(item => item.product._id === product._id);
        let newCart;
        if (existingItem) {
            newCart = state.cart.map(item =>
                item.product._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            newCart = [...state.cart, { product, quantity: 1 }];
        }
        localStorage.setItem('cart', JSON.stringify(newCart));
        return { cart: newCart };
    }),

    removeFromCart: (productId) => set((state) => {
        const newCart = state.cart.filter(item => item.product._id !== productId);
        localStorage.setItem('cart', JSON.stringify(newCart));
        return { cart: newCart };
    }),

    updateQuantity: (productId, quantity) => set((state) => {
        const newCart = state.cart.map(item =>
            item.product._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        );
        localStorage.setItem('cart', JSON.stringify(newCart));
        return { cart: newCart };
    }),

    clearCart: () => set(() => {
        localStorage.removeItem('cart');
        return { cart: [] };
    })
}));
