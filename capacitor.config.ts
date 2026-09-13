import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'id.smknubandar.xiitkj3',
  appName: 'XII TKJ 3',
  webDir: '.',
  server: {
    url: 'https://xii-tkj3-smknubandar.vercel.app/',
    cleartext: false
  },
  android: {
    backgroundColor: '#0b1220'
  }
};

export default config;
