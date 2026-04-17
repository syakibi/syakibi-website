import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useLocalStorage } from '@/hooks/use-LocalStorage.js';

const CommissionForm = () => {
  const [submissions, setSubmissions] = useLocalStorage('commissionSubmissions', []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm();

  const commissionType = watch('commissionType');
  const budget = watch('budget');

  const onSubmit = (data) => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      const submission = {
        id: Date.now(),
        ...data,
        submittedAt: new Date().toISOString()
      };
      
      setSubmissions([...submissions, submission]);
      
      toast.success('Commission request submitted', {
        description: 'Redirecting to Ko-fi for payment...'
      });
      
      reset();
      setIsSubmitting(false);
      
      setTimeout(() => {
        window.open('https://ko-fi.com', '_blank');
      }, 1500);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register('name', { required: 'Name is required' })}
          placeholder="Your name"
          className="text-foreground"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          placeholder="your.email@example.com"
          className="text-foreground"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="commissionType">Commission type</Label>
        <Select onValueChange={(value) => setValue('commissionType', value)} value={commissionType}>
          <SelectTrigger className="text-foreground">
            <SelectValue placeholder="Select commission type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="character-art">Character art</SelectItem>
            <SelectItem value="portrait">Portrait</SelectItem>
            <SelectItem value="illustration">Full illustration</SelectItem>
            <SelectItem value="emote-pack">Emote pack</SelectItem>
            <SelectItem value="banner">Stream banner</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.commissionType && (
          <p className="text-sm text-destructive">{errors.commissionType.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register('description', { 
            required: 'Description is required',
            minLength: { value: 20, message: 'Please provide at least 20 characters' }
          })}
          placeholder="Describe your commission request in detail..."
          rows={5}
          className="text-foreground resize-none"
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget range</Label>
        <Select onValueChange={(value) => setValue('budget', value)} value={budget}>
          <SelectTrigger className="text-foreground">
            <SelectValue placeholder="Select your budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="100-200">$100 - $200</SelectItem>
            <SelectItem value="200-500">$200 - $500</SelectItem>
            <SelectItem value="500+">$500+</SelectItem>
          </SelectContent>
        </Select>
        {errors.budget && (
          <p className="text-sm text-destructive">{errors.budget.message}</p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition-all duration-200"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit commission request'}
      </Button>
    </form>
  );
};

export default CommissionForm;