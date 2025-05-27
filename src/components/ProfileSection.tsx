
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { User, Edit2, Save, X } from 'lucide-react';

export const ProfileSection = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ full_name: '', avatar_url: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data) {
        setProfile(data);
      } else {
        // Create profile if it doesn't exist
        setProfile({
          full_name: user?.user_metadata?.full_name || '',
          avatar_url: user?.user_metadata?.avatar_url || '',
        });
      }
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast.success('Profile updated!', {
        description: 'Your profile has been successfully updated.',
      });
      setEditing(false);
    } catch (error: any) {
      toast.error('Failed to update profile', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <User size={20} />
            Profile
          </span>
          {!editing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditing(true)}
            >
              <Edit2 size={16} />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditing(false)}
              >
                <X size={16} />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={updateProfile}
                disabled={loading}
              >
                <Save size={16} />
                Save
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={user?.email || ''}
              disabled
              className="bg-gray-50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={profile.full_name}
              onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
              disabled={!editing}
              placeholder="Enter your full name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="joinDate">Member Since</Label>
            <Input
              id="joinDate"
              value={user?.created_at ? new Date(user.created_at).toLocaleDateString() : ''}
              disabled
              className="bg-gray-50"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
