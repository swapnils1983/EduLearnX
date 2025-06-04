import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const ReviewForm = ({ lectureId, onSubmitReview }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const { toast } = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (rating === 0) {
            toast({
                title: "Rating required",
                description: "Please select a rating before submitting your review.",
                variant: "destructive",
            });
            return;
        }

        if (comment.trim() === '') {
            toast({
                title: "Comment required",
                description: "Please add a comment to your review.",
                variant: "destructive",
            });
            return;
        }

        onSubmitReview({ rating, comment });

        setRating(0);
        setComment('');

        toast({
            title: "Review submitted",
            description: "Thank you for sharing your feedback!",
        });
    };

    return (
        <div className="border-t border-border py-8 animate-slide-in">
            <div className="max-w-4xl mx-auto px-8">
                <h2 className="text-xl font-medium mb-6">Share Your Feedback</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Your Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="text-amber-500 transition-transform duration-200 hover:scale-110 focus:outline-none focus:scale-110"
                                >
                                    <Star
                                        className={cn(
                                            "w-6 h-6 transition-all duration-150",
                                            (hoverRating !== 0 ? star <= hoverRating : star <= rating) && "fill-current"
                                        )}
                                    />
                                </button>
                            ))}
                            <span className="ml-2 text-sm text-muted-foreground">
                                {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Select rating'}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="comment" className="text-sm font-medium">Your Comment</label>
                        <textarea
                            id="comment"
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience with this lecture..."
                            className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 transition duration-200"
                        />
                    </div>

                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
                    >
                        <Send className="w-4 h-4" />
                        Submit Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewForm;