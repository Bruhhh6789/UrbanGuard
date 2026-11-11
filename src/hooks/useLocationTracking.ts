// Letak file: src/hooks/useLocationTracking.ts

import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
// Memanggil fungsi dari file store yang dikerjakan Anggota 1 (Muflih)
import { useDisasterStore } from '../store/useDisasterStore';

export const useLocationTracking = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const setCurrentLocation = useDisasterStore((state) => state.setCurrentLocation);

  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    const startTracking = async () => {
      // 1. Meminta izin akses GPS ke pengguna
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Izin akses lokasi ditolak. Harap izinkan melalui pengaturan.');
        return;
      }

      // 2. Mengambil titik lokasi pertama kali
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      // 3. Memantau pergerakan perangkat (real-time tracking di Expo Go)
      subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000, // Update tiap 5 detik
          distanceInterval: 10, // Atau update tiap perpindahan 10 meter
        },
        (newLocation) => {
          setCurrentLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });
        }
      );
    };

    startTracking();

    // 4. Membersihkan pelacakan saat aplikasi ditutup agar baterai tidak boros
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return { errorMsg };
};