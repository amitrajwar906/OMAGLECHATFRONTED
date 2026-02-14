import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layout, Header, Sidebar, Button, Card, Avatar, Badge, Modal, Input } from '../components/ui';
import api from '../services/api';
import toast from 'react-hot-toast';
import SEO from '../components/SEO';

const GroupSettings = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', description: '', isPublic: false });
  const [addUserForm, setAddUserForm] = useState({ userId: '' });
  const [updatingGroup, setUpdatingGroup] = useState(false);
  const [deletingGroup, setDeletingGroup] = useState(false);
  const [addingUser, setAddingUser] = useState(false);

  useEffect(() => {
    fetchGroupData();
  }, [groupId]);

  const fetchGroupData = async () => {
    try {
      const response = await api.get(`/groups/${groupId}`);
      console.log('Group response:', response.data);
      const groupData = response.data.data?.group || response.data.data || response.data;
      console.log('Group data:', groupData);
      setGroup(groupData);
    } catch (error) {
      console.error('Error fetching group data:', error);
      toast.error('Failed to load group data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGroup = async () => {
    if (!editForm.name.trim()) {
      toast.error('Group name is required');
      return;
    }
    
    setUpdatingGroup(true);
    try {
      const updateData = {
        name: editForm.name,
        description: editForm.description,
        isPrivate: !editForm.isPublic
      };
      
      await api.put(`/groups/${groupId}`, updateData);
      toast.success('Group updated successfully!');
      setShowEditModal(false);
      fetchGroupData();
    } catch (error) {
      console.error('Update group error:', error);
      toast.error(error.response?.data?.message || 'Failed to update group');
    } finally {
      setUpdatingGroup(false);
    }
  };

  const handleDeleteGroup = async () => {
    setDeletingGroup(true);
    try {
      await api.delete(`/groups/${groupId}`);
      toast.success('Group deleted successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Delete group error:', error);
      toast.error('Failed to delete group');
    } finally {
      setDeletingGroup(false);
    }
  };

  const handleAddUser = async () => {
    if (!addUserForm.userId.trim()) {
      toast.error('User ID is required');
      return;
    }
    
    setAddingUser(true);
    try {
      await api.post(`/groups/${groupId}/add-user`, {
        userId: addUserForm.userId
      });
      toast.success('User added successfully!');
      setShowAddUserModal(false);
      setAddUserForm({ userId: '' });
      fetchGroupData();
    } catch (error) {
      console.error('Add user error:', error);
      toast.error(error.response?.data?.message || 'Failed to add user');
    } finally {
      setAddingUser(false);
    }
  };

  const handleLeaveGroup = async () => {
    setDeletingGroup(true);
    try {
      await api.delete(`/groups/${groupId}/leave`);
      toast.success('Left group successfully');
      navigate('/dashboard');
    } catch (error) {
      console.error('Leave group error:', error);
      toast.error('Failed to leave group');
    } finally {
      setDeletingGroup(false);
    }
  };

  const openEditModal = () => {
    setEditForm({
      name: group?.name || '',
      description: group?.description || '',
      isPublic: !group?.isPrivate && !group?.is_public && group?.isPublic !== false
    });
    setShowEditModal(true);
  };

  const isAdmin = group?.admin?.id === user?.id || group?.admin === user?.id || group?.admin === String(user?.id);

  const handleSidebarChats = async (chatId) => {
    navigate(`/private/${chatId}`);
  };

  const handleSidebarGroups = async (groupId) => {
    navigate(`/group/${groupId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading group settings...</p>
        </div>
      </div>
    );
  }

  if (!group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Group not found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title={group?.name ? `${group.name} Settings` : 'Group Settings'} 
        description={`Manage settings for ${group?.name || 'your group'} on OmagleChat. Edit group name, description, members, and more.`}
        url={`/group/${groupId}/settings`}
        noIndex={true}
      />
      <Layout
      sidebarOpen={false}
      sidebar={
        <Sidebar
          isOpen={false}
          onClose={() => {}}
          chats={[]}
          groups={[]}
          onChatSelect={handleSidebarChats}
          onGroupSelect={handleSidebarGroups}
        />
      }
      header={
        <Header
          title="Group Settings"
          subtitle={group?.name || ''}
          showBackButton={true}
          onBackClick={() => navigate(`/group/${groupId}`)}
          actions={[
            {
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              ),
              label: 'Back to Group',
              onClick: () => navigate(`/group/${groupId}`)
            }
          ]}
        />
      }
    >
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto p-6">
          <Card className="mb-6">
            <div className="flex items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <Avatar
                src={group.avatar}
                alt={group.name}
                size="xl"
                fallback={group.name?.charAt(0)}
                className="ring-4 ring-white dark:ring-gray-800"
              />
              <div className="ml-6 flex-1">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {group.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {group.members?.length || 0} members • Created {group.createdAt ? new Date(group.createdAt).toLocaleDateString() : '-'}
                  </p>
                </div>
                {isAdmin && (
                  <div className="mt-4 flex items-center space-x-4">
                    <Badge variant="primary" size="sm">
                      Admin
                    </Badge>
                    <Badge variant="success" size="sm">
                      Group Owner
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="mb-6">
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Group Information
              </h3>
            </Card.Header>
            <Card.Body>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Group Name
                  </label>
                  <Input
                    type="text"
                    value={group.name}
                    disabled={!isAdmin}
                    className="bg-gray-50 dark:bg-gray-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={group.description || ''}
                    disabled={!isAdmin}
                    rows={3}
                    className="w-full bg-gray-50 dark:bg-gray-800 resize-none"
                  />
                </div>
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={!group.isPrivate && !group.is_public}
                      disabled={!isAdmin}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-2 text-gray-600 dark:text-gray-400">
                      Public Group (anyone can join)
                    </span>
                  </label>
                </div>
              </div>
            </Card.Body>
            {isAdmin && (
              <Card.Footer>
                <div className="flex space-x-4">
                  <Button
                    onClick={openEditModal}
                    variant="primary"
                    className="flex-1"
                  >
                    Edit Group
                  </Button>
                  <Button
                    onClick={() => setShowDeleteModal(true)}
                    variant="danger"
                    className="flex-1"
                  >
                    Delete Group
                  </Button>
                </div>
              </Card.Footer>
            )}
          </Card>

          <Card>
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Manage Members
              </h3>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Add User by ID
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter user ID"
                    value={addUserForm.userId}
                    onChange={(e) => setAddUserForm({ userId: e.target.value })}
                    className="w-full"
                  />
                </div>
                <Button
                  onClick={handleAddUser}
                  disabled={!addUserForm.userId.trim()}
                  loading={addingUser}
                  className="w-full"
                >
                  {addingUser ? 'Adding User...' : 'Add User'}
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Card className="mb-6">
            <Card.Header>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Group Actions
              </h3>
            </Card.Header>
            <Card.Body>
              <div className="space-y-4">
                <Button
                  onClick={() => setShowLeaveModal(true)}
                  variant="outline"
                  className="w-full"
                >
                  Leave Group
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>

      {/* Edit Group Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        size="md"
      >
        <Modal.Header>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Edit Group
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Group Name
              </label>
              <input
                type="text"
                placeholder="Group name"
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description (optional)
              </label>
              <textarea
                placeholder="What's this group about?"
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-700/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                rows={3}
              />
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={editForm.isPublic}
                  onChange={(e) => setEditForm(prev => ({ ...prev, isPublic: e.target.checked }))}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Make this group public (anyone can join)
                </span>
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowEditModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateGroup}
              loading={updatingGroup}
              disabled={!editForm.name.trim()}
            >
              Update Group
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Delete Group Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        size="md"
      >
        <Modal.Header>
          <h3 className="text-xl font-semibold text-red-600 dark:text-red-400">
            Delete Group
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 mb-4">
              <svg className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M-6.938 4h13.856c1.54 0 2.502-1.667 1.732L13.732 4c-.77.833.192-1.595 1.595-1.32 1.32-1.32.8L12 14z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Are you sure?
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This action cannot be undone. This will permanently delete the group "{group?.name}" and all its messages.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteGroup}
              loading={deletingGroup}
            >
              Delete Group
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Add User Modal */}
      <Modal
        isOpen={showAddUserModal}
        onClose={() => setShowAddUserModal(false)}
        size="md"
      >
        <Modal.Header>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Add User to Group
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                User ID
              </label>
              <input
                type="text"
                placeholder="Enter user ID to add"
                value={addUserForm.userId}
                onChange={(e) => setAddUserForm({ userId: e.target.value })}
                className="w-full"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter the user ID of the person you want to add to this group.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowAddUserModal(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddUser}
              loading={addingUser}
              disabled={!addUserForm.userId.trim()}
            >
              Add User
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </Layout>
    </>
  );
};

export default GroupSettings;