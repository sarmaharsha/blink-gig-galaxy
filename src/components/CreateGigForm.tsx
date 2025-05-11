
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { categories } from '@/data/mockData';
import { Category } from '@/lib/types';

const CreateGigForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '' as Category,
    timeEstimate: '',
    skills: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      category: value as Category
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Gig Created",
        description: "Your gig has been successfully posted!",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Gig Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g., Design a professional logo"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe the task in detail..."
          value={formData.description}
          onChange={handleChange}
          rows={5}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price (SOL)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            placeholder="0.05"
            step="0.01"
            min="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="capitalize">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="timeEstimate">Time Estimate</Label>
          <Input
            id="timeEstimate"
            name="timeEstimate"
            placeholder="e.g., 1-2 days"
            value={formData.timeEstimate}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="skills">Skills Required (comma separated)</Label>
          <Input
            id="skills"
            name="skills"
            placeholder="e.g., design, photoshop, illustration"
            value={formData.skills}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full bg-solana-purple hover:bg-solana-purple/90" disabled={loading}>
        {loading ? 'Creating...' : 'Post Gig'}
      </Button>
    </form>
  );
};

export default CreateGigForm;
