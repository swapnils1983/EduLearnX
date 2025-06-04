import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ReviewCard = ({ review }) => {
    return (
        <div className="border border-border rounded-lg p-4 mb-4 bg-card transition-all duration-300 hover:shadow-sm">
            <div className="flex justify-between items-start mb-2">
                <div className="font-medium">{review.studentName}</div>
                <div className="flex items-center text-amber-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className="w-4 h-4"
                            fill={i < review.rating ? "currentColor" : "none"}
                        />
                    ))}
                </div>
            </div>
            <p className="text-muted-foreground text-sm mb-2">{review.comment}</p>
            <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(review.date), { addSuffix: true })}
            </div>
        </div>
    );
};

const ReviewSection = ({ reviews, lectureId }) => {
    const lectureReviews = reviews.filter(review => review.lectureId === lectureId);

    return (
        <div className="border-t border-border py-8 animate-slide-in">
            <div className="max-w-4xl mx-auto px-8">
                <div className="flex items-center gap-2 mb-6">
                    <MessageSquare className="w-5 h-5" />
                    <h2 className="text-xl font-medium">Student Reviews</h2>
                    <div className="ml-auto text-sm text-muted-foreground">
                        {lectureReviews.length} {lectureReviews.length === 1 ? 'review' : 'reviews'}
                    </div>
                </div>

                {lectureReviews.length > 0 ? (
                    <div>
                        {lectureReviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground bg-secondary/50 rounded-lg">
                        No reviews yet for this lecture.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewSection;