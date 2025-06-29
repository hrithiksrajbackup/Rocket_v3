"use client";

import { useState } from 'react';
import { useUser } from '@/lib/hooks/use-user';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PremiumBadge } from '@/components/ui/premium-badge';
import { 
  User, 
  Settings, 
  CreditCard, 
  BarChart3, 
  Bell,
  Crown,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export function UserProfile() {
  const { user, loading, updateUser, isPremium, getUsageStats } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user?.profile || {});

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  const usageStats = getUsageStats();
  const premium = isPremium();

  const handleSave = async () => {
    await updateUser({ profile: formData });
    setIsEditing(false);
  };

  const getUsageColor = (used: number, limit: number, unlimited: boolean) => {
    if (unlimited) return 'bg-green-500';
    const percentage = (used / limit) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>
        {premium && <PremiumBadge />}
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Subscription
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Usage
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Personal Information
                <Button
                  variant={isEditing ? "default" : "outline"}
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={isEditing ? formData.firstName : user.profile.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={isEditing ? formData.lastName : user.profile.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user.profile.email}
                  disabled
                  className="bg-gray-50"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed here. Please update in your account settings.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={isEditing ? formData.jobTitle : user.profile.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Software Engineer"
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={isEditing ? formData.company : user.profile.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    disabled={!isEditing}
                    placeholder="Tech Corp"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select
                  value={isEditing ? formData.experienceLevel : user.profile.experienceLevel}
                  onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Subscription Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-lg capitalize">{user.subscription.plan} Plan</h3>
                  <p className="text-sm text-gray-600">
                    Status: <span className="capitalize">{user.subscription.status}</span>
                  </p>
                  {user.subscription.endDate && (
                    <p className="text-xs text-gray-500">
                      Expires: {new Date(user.subscription.endDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {premium && <PremiumBadge />}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Features</h4>
                  <div className="space-y-1">
                    {Object.entries(user.subscription.features).map(([feature, enabled]) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        {enabled ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={enabled ? 'text-gray-900' : 'text-gray-400'}>
                          {feature.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {!premium && (
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <h4 className="font-medium text-yellow-800 mb-2">Upgrade to Pro</h4>
                  <p className="text-sm text-yellow-700 mb-3">
                    Unlock all premium features including unlimited exports, AI analysis, and premium templates.
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Upgrade Now
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {usageStats && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Resumes Created</span>
                      <span>
                        {usageStats.resumes.used}
                        {!usageStats.resumes.unlimited && ` / ${usageStats.resumes.limit}`}
                      </span>
                    </div>
                    <Progress 
                      value={usageStats.resumes.unlimited ? 100 : (usageStats.resumes.used / usageStats.resumes.limit) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Exports This Month</span>
                      <span>
                        {usageStats.exports.used}
                        {!usageStats.exports.unlimited && ` / ${usageStats.exports.limit}`}
                      </span>
                    </div>
                    <Progress 
                      value={usageStats.exports.unlimited ? 100 : (usageStats.exports.used / usageStats.exports.limit) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>AI Analysis Used</span>
                      <span>
                        {usageStats.aiAnalysis.used}
                        {!usageStats.aiAnalysis.unlimited && ` / ${usageStats.aiAnalysis.limit}`}
                      </span>
                    </div>
                    <Progress 
                      value={usageStats.aiAnalysis.unlimited ? 100 : (usageStats.aiAnalysis.used / usageStats.aiAnalysis.limit) * 100}
                      className="h-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>ATS Checks</span>
                      <span>
                        {usageStats.atsChecks.used}
                        {!usageStats.atsChecks.unlimited && ` / ${usageStats.atsChecks.limit}`}
                      </span>
                    </div>
                    <Progress 
                      value={usageStats.atsChecks.unlimited ? 100 : (usageStats.atsChecks.used / usageStats.atsChecks.limit) * 100}
                      className="h-2"
                    />
                  </div>
                </div>
              )}

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Account Activity</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Member Since:</span>
                    <div className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Login:</span>
                    <div className="font-medium">{new Date(user.lastLoginAt).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Logins:</span>
                    <div className="font-medium">{user.usage.totalLoginCount}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Last Active:</span>
                    <div className="font-medium">{new Date(user.usage.lastActiveDate).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-4">Email Notifications</h4>
                <div className="space-y-3">
                  {Object.entries(user.preferences.emailNotifications).map(([key, enabled]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-sm">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                      <Switch checked={enabled} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Application Settings</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Auto-save</span>
                    <Switch checked={user.preferences.autoSave} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Default Template</Label>
                    <Select value={user.preferences.defaultTemplate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select value={user.preferences.theme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}