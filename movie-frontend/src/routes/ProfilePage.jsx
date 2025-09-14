import { useParams } from 'react-router-dom';
import { useGetProfileQuery, useGetWatchlistQuery, useUpdateProfileMutation } from '../features/users/usersApi';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function ProfilePage() {
  const { id = '' } = useParams();
  const auth = useSelector((s) => s.auth);
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery(id);
  const { data: watchlist } = useGetWatchlistQuery({ id, page: 1, limit: 20 });
  const [updateProfile] = useUpdateProfileMutation();

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');

  if (isLoading) return <p>Loading...</p>;
  if (isError || !profile) return <p>Error loading profile</p>;

  const u = profile.data;
  const canEdit = auth.user?.id === id || auth.user?.roles?.includes('admin');

  const save = async () => {
    try {
      await updateProfile({ id, body: { username, avatar, bio } }).unwrap();
      await refetch();
      alert('Profile updated');
    } catch {
      alert('Update failed');
    }
  };

  return (
    <section>
      <h2>Profile</h2>
      <img src={u.avatar} alt={u.username} width={64} height={64} />
      <p>{u.username} • {u.email}</p>
      <p>{u.bio}</p>

      {canEdit && (
        <div className="edit">
          <h3>Edit Profile</h3>
          <input placeholder="New username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="Avatar URL" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
          <textarea placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
          <button onClick={save}>Save</button>
        </div>
      )}

      <h3>Watchlist</h3>
      <div className="grid">
        {watchlist?.data?.map((w) => (
          <article key={w._id} className="card">
            <img src={w.movieId?.posterUrl} alt={w.movieId?.title} />
            <h4>{w.movieId?.title}</h4>
            <p>{w.movieId?.releaseYear} • {w.movieId?.genres?.join(', ')}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
