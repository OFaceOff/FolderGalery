const i18n = {
    en: {
        searchPlaceholder: "Search...", sortName: "Name (A-Z)", sortPhotos: "Most Photos", sortVideos: "Most Videos", sortTotal: "Most Files",
        sortMediaNewest: "Newest First", sortMediaOldest: "Oldest First", sortMediaNameAsc: "Name (A-Z)", sortMediaNameDesc: "Name (Z-A)",
        sortMediaSizeDesc: "Largest Size", sortMediaSizeAsc: "Smallest Size", sortMediaRandom: "Random",
        filterAll: "All", filterPhoto: "Photos", filterVideo: "Videos", btnDiscover: "Discover",
        splashWelcome: "Welcome to Folder Galery", splashDesc: "Select a main folder on your computer. Each subfolder will be automatically displayed as a gallery with its media.",
        splashBtn: "Select Folder", splashDisclaimer: "Uses the File System Access API. No files are sent to the internet. Everything is processed locally in your browser.",
        splashLoadPrev: "Load {count} saved folder(s)",
        loadingText: "Analyzing folders...", homeTitle: "Found Folders", homeCount: "{count} Folders | {size} GBs",
        emptySearch: "No folders found with this search.", galleryPhotos: "photos", galleryVideos: "videos",
        emptyMedia: "No media found.", discoverMode: "Discover Mode", discoverProfile: "View full folder gallery",
        errBrowser: "Browser incompatible with folder reading.", errNoFolders: "No valid folders found.", errFS: "Failed to read the file system.",
        errNoMedia: "No media found in folders.", errLoad: "Error loading media.", msgAnalyzing: "Analyzing: {name}",
        cardMedia: "{total} media", cardPhotos: "{photos} photos", cardVideos: "{videos} videos",
        tooltipSync: "Sync/Reload folder", tooltipSettings: "Settings", tooltipAddFolder: "Add a new root folder",
        settingsTitle: "Settings", settingsLang: "Language", langAuto: "Automatic (Browser)",
        settingsLayout: "Home Layout", layoutMixed: "Mix all folders", layoutGrouped: "Separate by root folder",
        settingsAnim: "Animated Thumbnails", settingsAnimHint: "Warning: Turning this on may cause lag on older PCs when scrolling with many videos.",
        settingsConnected: "Connected Folders",
        settingsDisconnect: "Clear All Data", settingsDisconnectHint: "This will make the system forget the connected folders. No files will be deleted from your PC.",
        msgSyncSuccess: "Folders synchronized successfully!", errPerm: "Permission denied for some folders.", msgFolderAdded: "Folder added successfully!"
    },
    pt: {
        searchPlaceholder: "Pesquisar...", sortName: "Nome (A-Z)", sortPhotos: "Mais Fotos", sortVideos: "Mais Vídeos", sortTotal: "Mais Arquivos",
        sortMediaNewest: "Mais Recentes", sortMediaOldest: "Mais Antigas", sortMediaNameAsc: "Nome (A-Z)", sortMediaNameDesc: "Nome (Z-A)",
        sortMediaSizeDesc: "Maior Tamanho", sortMediaSizeAsc: "Menor Tamanho", sortMediaRandom: "Aleatório",
        filterAll: "Tudo", filterPhoto: "Fotos", filterVideo: "Vídeos", btnDiscover: "Descobrir",
        splashWelcome: "Bem-vindo ao Folder Galery", splashDesc: "Selecione uma pasta principal do seu computador. Cada subpasta será exibida automaticamente como uma galeria com suas mídias.",
        splashBtn: "Selecionar Pasta", splashDisclaimer: "Utiliza a File System Access API. Nenhum arquivo é enviado para a internet. Tudo é processado localmente no seu navegador.",
        splashLoadPrev: "Carregar {count} pasta(s) salva(s)",
        loadingText: "Analisando pastas...", homeTitle: "Pastas Encontradas", homeCount: "{count} Pastas | {size} GBs",
        emptySearch: "Nenhuma pasta encontrada com esta pesquisa.", galleryPhotos: "fotos", galleryVideos: "vídeos",
        emptyMedia: "Nenhuma mídia encontrada.", discoverMode: "Modo Descobrir", discoverProfile: "Ver galeria completa da pasta",
        errBrowser: "Navegador incompatível com leitura de pastas.", errNoFolders: "Nenhuma pasta válida encontrada.", errFS: "Falha ao ler o sistema de arquivos.",
        errNoMedia: "Nenhuma mídia encontrada nas pastas.", errLoad: "Erro ao carregar mídia.", msgAnalyzing: "Analisando: {name}",
        cardMedia: "{total} mídias", cardPhotos: "{photos} fotos", cardVideos: "{videos} vídeos",
        tooltipSync: "Sincronizar/Recarregar pastas", tooltipSettings: "Configurações", tooltipAddFolder: "Adicionar uma nova pasta raiz",
        settingsTitle: "Configurações", settingsLang: "Idioma", langAuto: "Automático (Navegador)",
        settingsLayout: "Organização da Tela Inicial", layoutMixed: "Misturar Todas as Pastas", layoutGrouped: "Separar por Pasta Raiz",
        settingsAnim: "Miniaturas Animadas", settingsAnimHint: "Aviso: Ligar isso pode causar lentidão em PCs antigos ao rolar a página com muitos vídeos.",
        settingsConnected: "Pastas Conectadas",
        settingsDisconnect: "Limpar Todos os Dados", settingsDisconnectHint: "Isso fará o sistema esquecer as pastas atuais. Nenhum arquivo será apagado do seu PC.",
        msgSyncSuccess: "Pastas sincronizadas com sucesso!", errPerm: "Permissão negada para algumas pastas.", msgFolderAdded: "Pasta adicionada com sucesso!"
    }
};

const Lang = {
    current: 'en',
    init() {
        const savedLang = localStorage.getItem('fg_lang');
        if (savedLang && ['pt', 'en'].includes(savedLang)) {
            this.current = savedLang;
        } else {
            const userLang = navigator.language || navigator.userLanguage;
            this.current = userLang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
        }
        document.documentElement.lang = this.current;
        const langSelect = document.getElementById('lang-select');
        if (langSelect) langSelect.value = localStorage.getItem('fg_lang') || 'auto';
        this.applyToDOM();
    },
    t(key, params = {}) {
        let str = i18n[this.current][key] || key;
        for (const [k, v] of Object.entries(params)) str = str.replace(`{${k}}`, v);
        return str;
    },
    applyToDOM() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (el.tagName === 'INPUT' && el.type === 'text') el.placeholder = this.t(key);
            else el.textContent = this.t(key);
        });
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            el.title = this.t(el.dataset.i18nTitle);
        });
    }
};

function showNotif(msg) {
    const area = document.getElementById('notification-area');
    const notif = document.createElement('div');
    notif.className = 'bg-panel text-white px-4 py-3 rounded-xl shadow-2xl border border-white/10 flex items-center gap-3 transform translate-x-full transition-transform duration-300 pointer-events-auto text-sm font-medium';
    notif.innerHTML = `<svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> <span>${msg}</span>`;
    area.appendChild(notif);
    requestAnimationFrame(() => notif.classList.remove('translate-x-full'));
    setTimeout(() => { notif.classList.add('translate-x-full'); setTimeout(() => notif.remove(), 300); }, 3000);
}

const DB = {
    dbName: 'FolderGaleryDB',
    storeName: 'handles',
    async getDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 2);
            request.onupgradeneeded = (e) => {
                if (!e.target.result.objectStoreNames.contains(this.storeName)) {
                    e.target.result.createObjectStore(this.storeName);
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },
    async saveHandles(handles) {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(this.storeName, 'readwrite');
            tx.objectStore(this.storeName).put(handles, 'rootDirectories');
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    },
    async getHandles() {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(this.storeName, 'readwrite');
            const store = tx.objectStore(this.storeName);
            const reqArray = store.get('rootDirectories');
            reqArray.onsuccess = () => {
                if (reqArray.result) resolve(reqArray.result);
                else {
                    const reqSingle = store.get('rootDirectory');
                    reqSingle.onsuccess = () => {
                        if (reqSingle.result) {
                            const arr = [reqSingle.result];
                            store.put(arr, 'rootDirectories');
                            store.delete('rootDirectory');
                            resolve(arr);
                        } else resolve([]);
                    };
                }
            };
            reqArray.onerror = () => reject(tx.error);
        });
    },
    async clearHandles() {
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(this.storeName, 'readwrite');
            tx.objectStore(this.storeName).clear();
            tx.oncomplete = () => resolve();
            tx.onerror = () => reject(tx.error);
        });
    }
};

const Config = {
    photoExts: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'avif'],
    videoExts: ['mp4', 'webm', 'mov', 'mkv', 'avi', 'm4v'],
    isFileSupported(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        if (this.photoExts.includes(ext)) return 'photo';
        if (this.videoExts.includes(ext)) return 'video';
        return null;
    }
};

const Store = {
    rootHandles: [], profiles: [], currentProfile: null, mediaFilter: 'all', sortMode: 'name', mediaSortMode: 'date-desc', searchTerm: '',
    objectURLs: new Map(), globalMedia: [], animatedThumbs: false, displayMode: 'grouped',
    async getObjectURL(fileHandle) {
        if (this.objectURLs.has(fileHandle.name)) return this.objectURLs.get(fileHandle.name);
        const file = await fileHandle.getFile();
        const url = URL.createObjectURL(file);
        this.objectURLs.set(fileHandle.name, url);
        return url;
    },
    clearObjectURLs() {
        this.objectURLs.forEach(url => URL.revokeObjectURL(url));
        this.objectURLs.clear();
    },
    buildGlobalMedia() {
        let allMedia = [];
        this.profiles.forEach(profile => { profile.files.forEach(file => allMedia.push({ profile: profile, file: file })); });
        for (let i = allMedia.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [allMedia[i], allMedia[j]] = [allMedia[j], allMedia[i]];
        }
        this.globalMedia = allMedia;
    }
};

const FS = {
    async selectDirectory() {
        try {
            if (!window.showDirectoryPicker) { showNotif(Lang.t('errBrowser')); return null; }
            return await window.showDirectoryPicker();
        } catch (err) { return null; }
    },
    async verifyPermission(fileHandle) {
        const options = { mode: 'read' };
        if ((await fileHandle.queryPermission(options)) === 'granted') return true;
        if ((await fileHandle.requestPermission(options)) === 'granted') return true;
        return false;
    },
    async analyzeProfiles(rootHandle, progressCallback) {
        const profiles = [];
        for await (const entry of rootHandle.values()) {
            if (entry.kind === 'directory') {
                progressCallback(Lang.t('msgAnalyzing', { name: entry.name }));
                const profile = await this.readProfileFolder(entry, rootHandle.name);
                if (profile.files.length > 0) profiles.push(profile);
            }
        }
        return profiles;
    },
    async readProfileFolder(dirHandle, rootName) {
        const profile = { id: crypto.randomUUID(), name: dirHandle.name, rootName: rootName, files: [], photos: 0, videos: 0, sizeBytes: 0, avatarHandle: null, bannerHandle: null };
        const mediaHandles = [];
        const promises = [];
        async function scanFolder(handle) {
            for await (const entry of handle.values()) {
                if (entry.kind === 'file') {
                    const type = Config.isFileSupported(entry.name);
                    if (type) {
                        promises.push(
                            entry.getFile().then(file => {
                                mediaHandles.push({ handle: entry, type: type, name: entry.name, date: file.lastModified, size: file.size });
                                profile.sizeBytes += file.size;
                                if (type === 'photo') profile.photos++;
                                if (type === 'video') profile.videos++;
                            }).catch(() => { })
                        );
                    }
                } else if (entry.kind === 'directory') {
                    try { await scanFolder(entry); } catch (e) { }
                }
            }
        }
        await scanFolder(dirHandle);
        await Promise.all(promises);
        mediaHandles.sort((a, b) => b.date - a.date);
        profile.files = mediaHandles;
        const photoHandles = mediaHandles.filter(m => m.type === 'photo').map(m => m.handle);
        if (photoHandles.length > 0) {
            const r1 = Math.floor(Math.random() * photoHandles.length);
            profile.avatarHandle = photoHandles[r1];
            let r2 = r1;
            if (photoHandles.length > 1) { while (r2 === r1) r2 = Math.floor(Math.random() * photoHandles.length); }
            profile.bannerHandle = photoHandles[r2];
        }
        return profile;
    }
};

const LazyLoader = {
    observer: null,
    init() {
        this.observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(async entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    obs.unobserve(el);
                    if (el.dataset.handleId) {
                        let handle;
                        if (el.dataset.context === 'profile') {
                            const p = Store.profiles.find(p => p.id === el.dataset.profileId);
                            if (p) handle = el.dataset.type === 'avatar' ? p.avatarHandle : p.bannerHandle;
                        } else {
                            const media = Store.currentProfile.files.find(f => f.handle.name === el.dataset.handleId);
                            if (media) handle = media.handle;
                        }
                        if (handle) {
                            try {
                                const url = await Store.getObjectURL(handle);
                                if (el.tagName === 'IMG') {
                                    el.src = url;
                                    el.onload = () => { el.classList.remove('lazy-hidden'); el.classList.add('lazy-loaded'); el.parentElement.classList.remove('skeleton'); };
                                } else {
                                    el.src = url;
                                    el.onloadeddata = () => { el.classList.remove('lazy-hidden'); el.classList.add('lazy-loaded'); el.parentElement.classList.remove('skeleton'); };
                                }
                            } catch (e) { }
                        }
                    }
                }
            });
        }, { rootMargin: '200px 0px' });
    },
    observe(element) { if (this.observer) this.observer.observe(element); }
};

const UI = {
    els: {
        splash: document.getElementById('splash-screen'),
        loading: document.getElementById('loading-view'),
        loadingText: document.getElementById('loading-text'),
        home: document.getElementById('home-view'),
        gallery: document.getElementById('gallery-view'),
        profilesContainer: document.getElementById('profiles-container'),
        mediaContainer: document.getElementById('media-container'),
        search: document.getElementById('search-container'),
        searchInput: document.getElementById('search-input'),
        sort: document.getElementById('sort-select'),
        mediaSort: document.getElementById('media-sort-select'),
        filter: document.getElementById('filter-container'),
        btnBack: document.getElementById('btn-back'),
        btnDiscover: document.getElementById('btn-discover'),
        btnAddFolder: document.getElementById('btn-add-folder-header'),
        btnReload: document.getElementById('btn-reload'),
        btnSettings: document.getElementById('btn-settings'),
        btnTop: document.getElementById('btn-top'),
        profilesCount: document.getElementById('profiles-count'),
        settingsModal: document.getElementById('settings-modal')
    },

    showLoading(text) {
        this.els.splash.classList.add('hidden');
        this.els.home.classList.add('hidden');
        this.els.gallery.classList.add('hidden');
        this.els.loading.classList.remove('hidden');
        this.els.loading.classList.add('flex');
        this.els.loadingText.textContent = text;
        this.els.search.classList.add('hidden');
        this.els.sort.classList.add('hidden');
        this.els.mediaSort.classList.add('hidden');
        this.els.filter.classList.add('hidden');
        this.els.btnBack.classList.add('hidden');
        this.els.btnDiscover.classList.add('hidden');
        this.els.btnAddFolder.classList.add('hidden');
        this.els.btnReload.classList.add('hidden');
        this.els.btnSettings.classList.add('hidden');
    },
    showHome() {
        this.els.loading.classList.add('hidden');
        this.els.loading.classList.remove('flex');
        this.els.gallery.classList.add('hidden');
        this.els.splash.classList.add('hidden');
        this.els.home.classList.remove('hidden');
        this.els.search.classList.remove('hidden');
        this.els.sort.classList.remove('hidden');
        this.els.mediaSort.classList.add('hidden');
        this.els.filter.classList.add('hidden');
        this.els.btnBack.classList.add('hidden');
        this.els.btnDiscover.classList.remove('hidden');
        this.els.btnAddFolder.classList.remove('hidden');
        this.els.btnReload.classList.remove('hidden');
        this.els.btnSettings.classList.remove('hidden');
        this.renderProfiles();
    },
    showGallery(profile) {
        Store.currentProfile = profile;
        Store.mediaFilter = 'all';
        Store.mediaSortMode = 'date-desc';
        document.getElementById('media-sort-select').value = 'date-desc';
        this.els.home.classList.add('hidden');
        this.els.gallery.classList.remove('hidden');
        this.els.search.classList.add('hidden');
        this.els.sort.classList.add('hidden');
        this.els.mediaSort.classList.remove('hidden');
        this.els.filter.classList.remove('hidden');
        this.els.filter.classList.add('flex');
        this.els.btnBack.classList.remove('hidden');
        this.els.btnDiscover.classList.add('hidden');
        this.els.btnAddFolder.classList.add('hidden');
        this.els.btnReload.classList.add('hidden');

        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-white/10');
            if (b.dataset.filter === 'all') b.classList.add('bg-white/10');
        });
        document.getElementById('gallery-title').textContent = profile.name;
        document.getElementById('gallery-photos-count').textContent = profile.photos;
        document.getElementById('gallery-videos-count').textContent = profile.videos;

        const avatarContainer = document.getElementById('gallery-avatar');
        avatarContainer.innerHTML = '';
        avatarContainer.classList.add('skeleton');
        if (profile.avatarHandle) {
            const img = document.createElement('img');
            img.className = 'w-full h-full object-cover lazy-hidden';
            img.dataset.handleId = 'avatar';
            img.dataset.context = 'profile';
            img.dataset.profileId = profile.id;
            img.dataset.type = 'avatar';
            avatarContainer.appendChild(img);
            LazyLoader.observe(img);
        } else {
            avatarContainer.classList.remove('skeleton');
            avatarContainer.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-3xl font-bold text-gray-500">${profile.name.charAt(0)}</div>`;
        }
        this.renderMedia();
    },
    createProfileCard(profile) {
        const card = document.createElement('div');
        card.className = 'bg-panel rounded-2xl overflow-hidden shadow-lg border border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 cursor-pointer group flex flex-col';
        card.onclick = () => this.showGallery(profile);

        const bannerHTML = profile.bannerHandle
            ? `<div class="h-28 w-full skeleton relative overflow-hidden"><img data-context="profile" data-profile-id="${profile.id}" data-type="banner" data-handle-id="banner" class="w-full h-full object-cover lazy-hidden group-hover:scale-105 transition-transform duration-500"><div class="absolute inset-0 bg-gradient-to-t from-panel to-transparent"></div></div>`
            : `<div class="h-28 w-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 relative"><div class="absolute inset-0 bg-gradient-to-t from-panel to-transparent"></div></div>`;
        const avatarHTML = profile.avatarHandle
            ? `<div class="w-14 h-14 rounded-full border-[3px] border-panel skeleton absolute -bottom-7 left-4 overflow-hidden z-10 shadow-lg"><img data-context="profile" data-profile-id="${profile.id}" data-type="avatar" data-handle-id="avatar" class="w-full h-full object-cover lazy-hidden"></div>`
            : `<div class="w-14 h-14 rounded-full border-[3px] border-panel bg-gray-800 flex items-center justify-center text-base font-bold absolute -bottom-7 left-4 z-10 shadow-lg">${profile.name.charAt(0)}</div>`;

        card.innerHTML = `
            <div class="relative mb-9">${bannerHTML}${avatarHTML}</div>
            <div class="p-4 pt-0">
                <h3 class="font-bold text-base mb-1.5 line-clamp-1 group-hover:text-accent transition-colors">${profile.name}</h3>
                <div class="text-xs text-gray-400 font-medium flex flex-wrap gap-x-3 gap-y-1">
                    <span>${Lang.t('cardMedia', { total: profile.files.length })}</span>
                    <span>${Lang.t('cardPhotos', { photos: profile.photos })}</span>
                    <span>${Lang.t('cardVideos', { videos: profile.videos })}</span>
                </div>
            </div>`;
        card.querySelectorAll('img').forEach(img => LazyLoader.observe(img));
        return card;
    },
    renderProfiles() {
        let profiles = [...Store.profiles];
        if (Store.searchTerm) {
            const term = Store.searchTerm.toLowerCase();
            profiles = profiles.filter(p => p.name.toLowerCase().includes(term));
        }
        profiles.sort((a, b) => {
            if (Store.sortMode === 'name') return a.name.localeCompare(b.name);
            if (Store.sortMode === 'photos') return b.photos - a.photos;
            if (Store.sortMode === 'videos') return b.videos - a.videos;
            if (Store.sortMode === 'total') return b.files.length - a.files.length;
            return 0;
        });

        const totalBytes = profiles.reduce((sum, p) => sum + p.sizeBytes, 0);
        const totalGB = (totalBytes / (1024 * 1024 * 1024)).toFixed(2);
        this.els.profilesCount.textContent = Lang.t('homeCount', { count: profiles.length, size: totalGB });

        const emptyState = document.getElementById('profiles-empty-state');
        if (profiles.length === 0) {
            emptyState.classList.remove('hidden');
            emptyState.classList.add('flex');
            this.els.profilesContainer.innerHTML = '';
            return;
        } else {
            emptyState.classList.add('hidden');
            emptyState.classList.remove('flex');
        }

        this.els.profilesContainer.innerHTML = '';

        if (Store.displayMode === 'grouped') {
            this.els.profilesContainer.className = 'flex flex-col gap-10';
            const groups = {};
            profiles.forEach(p => {
                if (!groups[p.rootName]) groups[p.rootName] = [];
                groups[p.rootName].push(p);
            });
            for (const [rootName, groupProfiles] of Object.entries(groups)) {
                const wrap = document.createElement('div');
                wrap.innerHTML = `
                    <h3 class="text-xl font-bold text-accent mb-4 flex items-center gap-2 cursor-pointer hover:text-purple-400 transition-colors select-none group" title="Mostrar/Ocultar pasta">
                        <svg class="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6a2 2 0 012-2h5.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H18a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"></path></svg>
                        <span class="truncate">${rootName}</span> 
                        <span class="text-xs text-gray-500 font-medium bg-white/5 px-2 py-1 rounded-md ml-2">${groupProfiles.length}</span>
                        <div class="ml-auto p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                            <svg class="w-5 h-5 text-gray-400 transform transition-transform duration-300 chevron-icon rotate-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </h3>
                    <div class="profile-grid"></div>
                `;

                const header = wrap.querySelector('h3');
                const grid = wrap.querySelector('.profile-grid');
                const chevron = wrap.querySelector('.chevron-icon');

                header.onclick = () => {
                    grid.classList.toggle('hidden');
                    chevron.classList.toggle('-rotate-180');
                };

                groupProfiles.forEach(p => grid.appendChild(this.createProfileCard(p)));
                this.els.profilesContainer.appendChild(wrap);
            }
        } else {
            this.els.profilesContainer.className = 'profile-grid';
            profiles.forEach(p => this.els.profilesContainer.appendChild(this.createProfileCard(p)));
        }
    },
    renderMedia() {
        const profile = Store.currentProfile;
        if (!profile) return;
        let media = [...profile.files];
        if (Store.mediaSortMode === 'date-desc') media.sort((a, b) => b.date - a.date);
        else if (Store.mediaSortMode === 'date-asc') media.sort((a, b) => a.date - b.date);
        else if (Store.mediaSortMode === 'name-asc') media.sort((a, b) => a.name.localeCompare(b.name));
        else if (Store.mediaSortMode === 'name-desc') media.sort((a, b) => b.name.localeCompare(a.name));
        else if (Store.mediaSortMode === 'size-desc') media.sort((a, b) => b.size - a.size);
        else if (Store.mediaSortMode === 'size-asc') media.sort((a, b) => a.size - b.size);
        else if (Store.mediaSortMode === 'random') media.sort(() => Math.random() - 0.5);

        if (Store.mediaFilter === 'photo') media = media.filter(m => m.type === 'photo');
        if (Store.mediaFilter === 'video') media = media.filter(m => m.type === 'video');

        Store.filteredMedia = media;
        this.els.mediaContainer.innerHTML = '';
        const emptyState = document.getElementById('empty-state');
        if (media.length === 0) { emptyState.classList.remove('hidden'); return; }
        else emptyState.classList.add('hidden');

        const fragment = document.createDocumentFragment();
        media.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'masonry-item rounded-xl overflow-hidden bg-panel skeleton relative group cursor-pointer shadow-md';
            el.onclick = () => Viewer.open(index);

            const randomHeights = ['h-48', 'h-64', 'h-72'];
            const fakeHeight = randomHeights[index % randomHeights.length];
            el.classList.add(fakeHeight);
            const dynamicClasses = Store.animatedThumbs ? 'hover:scale-105 transition-transform duration-500' : '';

            if (item.type === 'photo') {
                el.innerHTML = `<img data-handle-id="${item.handle.name}" data-context="media" class="w-full h-full object-cover lazy-hidden hover:scale-105 transition-transform duration-500 block">`;
            } else {
                const hoverEvents = Store.animatedThumbs ? 'onmouseover="this.play()" onmouseout="this.pause()"' : '';
                el.innerHTML = `<video data-handle-id="${item.handle.name}" data-context="media" class="w-full h-full object-cover lazy-hidden block ${dynamicClasses}" muted loop ${hoverEvents}></video><div class="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-white backdrop-blur-sm z-10 pointer-events-none"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></div>`;
            }
            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 pointer-events-none z-10';
            overlay.innerHTML = `<span class="text-sm font-medium truncate text-white/90 drop-shadow-md">${item.name}</span>`;
            el.appendChild(overlay);
            fragment.appendChild(el);

            const mediaTag = el.querySelector('img, video');
            const resetHeight = () => {
                el.classList.remove(...randomHeights);
                el.classList.add('h-auto');
                mediaTag.classList.remove('h-full', 'object-cover');
                mediaTag.classList.add('h-auto');
            };
            if (item.type === 'photo') mediaTag.onload = resetHeight;
            else mediaTag.onloadeddata = resetHeight;
            LazyLoader.observe(mediaTag);
        });
        this.els.mediaContainer.appendChild(fragment);
    },
    toggleSettings(show) {
        if (show) {
            this.els.settingsModal.classList.remove('hidden');
            this.els.settingsModal.classList.add('flex');
            void this.els.settingsModal.offsetWidth;
            this.els.settingsModal.classList.remove('opacity-0');
            this.els.settingsModal.querySelector('div').classList.remove('scale-95');
        } else {
            this.els.settingsModal.classList.add('opacity-0');
            this.els.settingsModal.querySelector('div').classList.add('scale-95');
            setTimeout(() => {
                this.els.settingsModal.classList.add('hidden');
                this.els.settingsModal.classList.remove('flex');
            }, 300);
        }
    }
};

const Viewer = {
    currentIndex: 0, isOpen: false, scale: 1, posX: 0, posY: 0, isDragging: false, startX: 0, startY: 0,
    els: {
        container: document.getElementById('viewer'), mediaBox: document.getElementById('viewer-media-container'),
        counter: document.getElementById('viewer-counter'), btnClose: document.getElementById('viewer-close'),
        btnPrev: document.getElementById('viewer-prev'), btnNext: document.getElementById('viewer-next'),
        areaLeft: document.getElementById('viewer-area-left'), areaRight: document.getElementById('viewer-area-right')
    },
    init() {
        this.els.btnClose.addEventListener('click', () => this.close());
        this.els.btnPrev.addEventListener('click', (e) => { e.stopPropagation(); this.prev(); });
        this.els.btnNext.addEventListener('click', (e) => { e.stopPropagation(); this.next(); });
        this.els.areaLeft.addEventListener('click', () => this.prev());
        this.els.areaRight.addEventListener('click', () => this.next());
        this.els.container.addEventListener('click', (e) => { if (e.target === this.els.container || e.target === this.els.mediaBox) this.close(); });
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        this.els.mediaBox.addEventListener('wheel', (e) => { e.preventDefault(); this.zoom(e.deltaY > 0 ? -0.1 : 0.1); }, { passive: false });
        this.els.mediaBox.addEventListener('dblclick', (e) => {
            if (e.target.tagName !== 'IMG') return;
            if (this.scale > 1) { this.scale = 1; this.posX = 0; this.posY = 0; } else this.scale = 2;
            this.updateTransform();
        });
        this.els.mediaBox.addEventListener('mousedown', (e) => {
            if (this.scale <= 1 || e.target.tagName !== 'IMG') return;
            this.isDragging = true;
            this.startX = e.clientX - this.posX;
            this.startY = e.clientY - this.posY;
            this.els.mediaBox.style.cursor = 'grabbing';
        });
        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            this.posX = e.clientX - this.startX;
            this.posY = e.clientY - this.startY;
            this.updateTransform();
        });
        window.addEventListener('mouseup', () => { this.isDragging = false; this.els.mediaBox.style.cursor = 'move'; });
    },
    async open(index) {
        this.currentIndex = index; this.isOpen = true;
        this.els.container.classList.remove('hidden');
        void this.els.container.offsetWidth;
        this.els.container.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.renderCurrent();
    },
    close() {
        this.isOpen = false;
        this.els.container.classList.remove('active');
        setTimeout(() => {
            this.els.container.classList.add('hidden');
            this.els.mediaBox.innerHTML = '';
            document.body.style.overflow = 'auto';
        }, 300);
    },
    prev() { if (this.currentIndex > 0) { this.currentIndex--; this.renderCurrent(); } },
    next() { if (this.currentIndex < Store.filteredMedia.length - 1) { this.currentIndex++; this.renderCurrent(); } },
    zoom(delta) {
        this.scale += delta;
        if (this.scale < 1) { this.scale = 1; this.posX = 0; this.posY = 0; }
        if (this.scale > 5) this.scale = 5;
        this.updateTransform();
    },
    updateTransform() {
        const el = this.els.mediaBox.firstElementChild;
        if (el) el.style.transform = `translate(${this.posX}px, ${this.posY}px) scale(${this.scale})`;
    },
    async renderCurrent() {
        const media = Store.filteredMedia[this.currentIndex];
        if (!media) return;
        this.scale = 1; this.posX = 0; this.posY = 0;
        this.els.counter.textContent = `${this.currentIndex + 1} / ${Store.filteredMedia.length}`;
        this.els.mediaBox.innerHTML = `<div class="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>`;
        try {
            const url = await Store.getObjectURL(media.handle);
            this.els.mediaBox.innerHTML = '';
            let el;
            if (media.type === 'photo') {
                el = document.createElement('img');
                el.src = url;
                el.className = 'max-w-full max-h-full object-contain viewer-content shadow-2xl';
                el.draggable = false;
            } else {
                el = document.createElement('video');
                el.src = url;
                el.controls = true; el.autoplay = true;
                el.className = 'max-w-full max-h-full object-contain viewer-content shadow-2xl rounded-lg';
            }
            this.els.mediaBox.appendChild(el);
            this.els.btnPrev.style.display = this.currentIndex === 0 ? 'none' : 'block';
            this.els.btnNext.style.display = this.currentIndex === Store.filteredMedia.length - 1 ? 'none' : 'block';
        } catch (e) { this.els.mediaBox.innerHTML = `<div class="text-red-400">${Lang.t('errLoad')}</div>`; }
    }
};

const DiscoverMode = {
    currentIndex: 0, isOpen: false, touchStartX: 0, isMuted: true,
    els: {
        container: document.getElementById('discover-view'), mediaBox: document.getElementById('discover-media-container'),
        bgMap: document.getElementById('discover-bg'), btnClose: document.getElementById('discover-close'),
        btnPrev: document.getElementById('discover-prev'), btnNext: document.getElementById('discover-next'),
        areaLeft: document.getElementById('discover-area-left'), areaRight: document.getElementById('discover-area-right'),
        btnProfile: document.getElementById('discover-profile-btn'), avatarBox: document.getElementById('discover-avatar'),
        nameText: document.getElementById('discover-name-text'), btnVolume: document.getElementById('discover-volume')
    },
    init() {
        this.els.btnClose.addEventListener('click', () => this.close());
        this.els.btnPrev.addEventListener('click', () => this.prev());
        this.els.btnNext.addEventListener('click', () => this.next());
        this.els.areaLeft.addEventListener('click', () => this.prev());
        this.els.areaRight.addEventListener('click', () => this.next());
        this.els.container.addEventListener('touchstart', e => this.touchStartX = e.changedTouches[0].screenX, { passive: true });
        this.els.container.addEventListener('touchend', e => {
            if (!this.isOpen) return;
            const diff = this.touchStartX - e.changedTouches[0].screenX;
            if (diff > 50) this.next();
            if (diff < -50) this.prev();
        }, { passive: true });
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            if (e.key === 'Escape') this.close();
            if (e.key === 'ArrowLeft') this.prev();
            if (e.key === 'ArrowRight') this.next();
        });
        this.els.btnVolume.addEventListener('click', () => {
            this.isMuted = !this.isMuted;
            this.updateVolumeIcon();
            const video = this.els.mediaBox.querySelector('video');
            if (video) video.muted = this.isMuted;
        });
        this.els.btnProfile.addEventListener('click', () => {
            const currentItem = Store.globalMedia[this.currentIndex];
            if (currentItem) { this.close(); UI.showGallery(currentItem.profile); }
        });
    },
    updateVolumeIcon() {
        if (this.isMuted) {
            this.els.btnVolume.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path></svg>`;
        } else {
            this.els.btnVolume.innerHTML = `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>`;
        }
    },
    open() {
        if (Store.profiles.length === 0) return;
        Store.buildGlobalMedia();
        if (Store.globalMedia.length === 0) { showNotif(Lang.t('errNoMedia')); return; }
        this.currentIndex = 0;
        this.isOpen = true;
        this.els.container.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.renderCurrent();
    },
    close() {
        this.isOpen = false;
        this.els.container.classList.add('hidden');
        this.els.mediaBox.innerHTML = '';
        document.body.style.overflow = 'auto';
    },
    prev() { if (this.currentIndex > 0) { this.currentIndex--; this.renderCurrent(); } },
    next() { if (this.currentIndex < Store.globalMedia.length - 1) { this.currentIndex++; this.renderCurrent(); } },
    async renderCurrent() {
        const item = Store.globalMedia[this.currentIndex];
        if (!item) return;
        this.els.mediaBox.classList.remove('scale-100', 'opacity-100');
        this.els.mediaBox.classList.add('scale-95', 'opacity-0');
        this.els.mediaBox.innerHTML = `<div class="w-10 h-10 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>`;
        this.els.btnVolume.classList.add('hidden');
        this.els.nameText.textContent = item.profile.name;
        this.els.avatarBox.innerHTML = '';
        this.els.avatarBox.classList.add('skeleton');

        try {
            const url = await Store.getObjectURL(item.file.handle);
            this.els.mediaBox.innerHTML = '';
            this.els.mediaBox.classList.remove('scale-95', 'opacity-0');
            this.els.mediaBox.classList.add('scale-100', 'opacity-100', 'transition-all', 'duration-300');
            this.els.bgMap.style.backgroundImage = `url('${url}')`;
            let el;
            if (item.file.type === 'photo') {
                el = document.createElement('img'); el.src = url; el.className = 'w-full h-full object-contain pointer-events-none drop-shadow-2xl';
            } else {
                el = document.createElement('video'); el.src = url; el.loop = true; el.autoplay = true; el.muted = this.isMuted; el.playsInline = true; el.className = 'w-full h-full object-contain pointer-events-none drop-shadow-2xl';
                this.els.btnVolume.classList.remove('hidden');
            }
            this.els.mediaBox.appendChild(el);
            if (item.profile.avatarHandle) {
                const avatarUrl = await Store.getObjectURL(item.profile.avatarHandle);
                this.els.avatarBox.innerHTML = `<img src="${avatarUrl}" class="w-full h-full object-cover">`;
                this.els.avatarBox.classList.remove('skeleton');
            } else {
                this.els.avatarBox.classList.remove('skeleton');
                this.els.avatarBox.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-lg font-bold text-gray-400">${item.profile.name.charAt(0)}</div>`;
            }
            this.els.btnPrev.style.display = this.currentIndex === 0 ? 'none' : 'block';
            this.els.btnNext.style.display = this.currentIndex === Store.globalMedia.length - 1 ? 'none' : 'block';
        } catch (e) { this.els.mediaBox.innerHTML = `<div class="text-red-400">${Lang.t('errLoad')}</div>`; }
    }
};

const App = {
    async init() {
        Lang.init(); LazyLoader.init(); Viewer.init(); DiscoverMode.init();

        const savedAnim = localStorage.getItem('fg_animated_thumbs');
        if (savedAnim !== null) {
            Store.animatedThumbs = savedAnim === 'true';
            document.getElementById('anim-toggle').checked = Store.animatedThumbs;
        }
        const savedDisplay = localStorage.getItem('fg_display_mode');
        if (savedDisplay) {
            Store.displayMode = savedDisplay;
        }

        const layoutSelect = document.getElementById('layout-select');
        if (layoutSelect) layoutSelect.value = Store.displayMode;

        document.getElementById('btn-splash-select').addEventListener('click', () => this.handleFolderSelection(true));
        document.getElementById('btn-splash-load').addEventListener('click', () => this.loadExistingFolders());
        UI.els.btnDiscover.addEventListener('click', () => DiscoverMode.open());
        UI.els.btnBack.addEventListener('click', () => UI.showHome());
        UI.els.btnAddFolder.addEventListener('click', () => this.handleFolderSelection());
        UI.els.btnReload.addEventListener('click', () => this.syncFolder());
        UI.els.btnSettings.addEventListener('click', () => UI.toggleSettings(true));
        document.getElementById('btn-close-settings').addEventListener('click', () => UI.toggleSettings(false));

        UI.els.settingsModal.addEventListener('click', (e) => {
            if (e.target === UI.els.settingsModal) {
                UI.toggleSettings(false);
            }
        });

        document.getElementById('brand-logo').addEventListener('click', () => { if (Store.profiles.length > 0) UI.showHome(); });
        UI.els.searchInput.addEventListener('input', (e) => { Store.searchTerm = e.target.value; UI.renderProfiles(); });
        UI.els.sort.addEventListener('change', (e) => { Store.sortMode = e.target.value; UI.renderProfiles(); });
        UI.els.mediaSort.addEventListener('change', (e) => { Store.mediaSortMode = e.target.value; UI.renderMedia(); });

        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('bg-white/10'));
                e.target.classList.add('bg-white/10');
                Store.mediaFilter = e.target.dataset.filter;
                UI.renderMedia();
            });
        });

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) UI.els.btnTop.classList.remove('opacity-0', 'pointer-events-none');
            else UI.els.btnTop.classList.add('opacity-0', 'pointer-events-none');
        });
        UI.els.btnTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

        document.getElementById('lang-select').addEventListener('change', (e) => {
            const val = e.target.value;
            if (val === 'auto') localStorage.removeItem('fg_lang');
            else localStorage.setItem('fg_lang', val);
            window.location.reload();
        });

        document.getElementById('layout-select').addEventListener('change', (e) => {
            Store.displayMode = e.target.value;
            localStorage.setItem('fg_display_mode', Store.displayMode);
            if (Store.profiles.length > 0) UI.renderProfiles();
        });

        document.getElementById('anim-toggle').addEventListener('change', (e) => {
            Store.animatedThumbs = e.target.checked;
            localStorage.setItem('fg_animated_thumbs', Store.animatedThumbs);
            if (Store.currentProfile) UI.renderMedia();
        });

        document.getElementById('btn-disconnect').addEventListener('click', async () => {
            await DB.clearHandles();
            window.location.reload();
        });

        try {
            const handles = await DB.getHandles();
            if (handles && handles.length > 0) {
                Store.rootHandles = handles;
                document.getElementById('btn-splash-load').classList.remove('hidden');
                document.getElementById('splash-load-text').textContent = Lang.t('splashLoadPrev', { count: handles.length });
            }
        } catch (e) { }
    },

    updateSettingsFolderList() {
        const list = document.getElementById('settings-folders-list');
        list.innerHTML = '';
        if (Store.rootHandles.length === 0) {
            list.innerHTML = `<span class="text-xs text-gray-500">Nenhuma pasta</span>`;
            return;
        }
        Store.rootHandles.forEach((handle, index) => {
            const item = document.createElement('div');
            item.className = 'flex items-center justify-between bg-darker border border-white/5 px-3 py-2 rounded-lg';
            item.innerHTML = `
                <span class="text-xs text-gray-300 font-medium truncate flex-1 pr-2">${handle.name}</span>
                <button class="text-red-400 hover:text-red-300 p-1 flex-shrink-0" title="Remover pasta">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>`;
            item.querySelector('button').onclick = async () => {
                Store.rootHandles.splice(index, 1);
                await DB.saveHandles(Store.rootHandles);
                if (Store.rootHandles.length === 0) window.location.reload();
                else await this.processAllFolders();
            };
            list.appendChild(item);
        });
    },

    async loadExistingFolders() {
        if (Store.rootHandles.length === 0) return;
        let anyGranted = false;
        for (let i = 0; i < Store.rootHandles.length; i++) {
            const hasPerm = await FS.verifyPermission(Store.rootHandles[i]);
            if (hasPerm) anyGranted = true;
        }
        if (!anyGranted) {
            showNotif(Lang.t('errPerm'));
            document.getElementById('btn-splash-load').classList.add('hidden');
            return;
        }
        await this.processAllFolders();
    },

    async handleFolderSelection(isFirstLoad = false) {
        const dirHandle = await FS.selectDirectory();
        if (!dirHandle) return;

        if (Store.rootHandles.some(h => h.name === dirHandle.name)) {
            showNotif("Pasta já adicionada!");
            return;
        }

        Store.rootHandles.push(dirHandle);
        await DB.saveHandles(Store.rootHandles);
        showNotif(Lang.t('msgFolderAdded'));
        await this.processAllFolders();
    },

    async syncFolder() {
        if (Store.rootHandles.length === 0) return;
        await this.processAllFolders();
        showNotif(Lang.t('msgSyncSuccess'));
    },

    async processAllFolders() {
        UI.showLoading(Lang.t('loadingText'));
        UI.toggleSettings(false);
        Store.clearObjectURLs();
        Store.profiles = [];

        try {
            let validHandles = [];
            for (const handle of Store.rootHandles) {
                try {
                    const hasPerm = await FS.verifyPermission(handle);
                    if (!hasPerm) continue;
                    const subProfiles = await FS.analyzeProfiles(handle, (msg) => {
                        UI.els.loadingText.textContent = `${handle.name}: ${msg}`;
                    });
                    Store.profiles = Store.profiles.concat(subProfiles);
                    validHandles.push(handle);
                } catch (e) { }
            }

            Store.rootHandles = validHandles;
            await DB.saveHandles(Store.rootHandles);

            if (Store.profiles.length > 0) {
                UI.showHome();
                this.updateSettingsFolderList();
            } else {
                showNotif(Lang.t('errNoFolders'));
                UI.els.loading.classList.add('hidden');
                UI.els.splash.classList.remove('hidden');
            }
        } catch (error) {
            showNotif(Lang.t('errFS'));
            UI.els.loading.classList.add('hidden');
            UI.els.splash.classList.remove('hidden');
        }
    }
};

window.addEventListener('DOMContentLoaded', () => App.init());