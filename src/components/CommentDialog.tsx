import { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";
import {
  MessageSquareIcon,
  StarIcon,
  SparklesIcon,
  SendIcon,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { getInterviewerInfo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

function CommentDialog({ interviewId }: { interviewId: Id<"interviews"> }) {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("3");

  const addComment = useMutation(api.comments.addComment);
  const users = useQuery(api.users.getUsers);
  const existingComments = useQuery(api.comments.getComments, { interviewId });

  //add comment
  const handleSubmit = async () => {
    if (!comment.trim()) return toast.error("Please enter comment");

    try {
      await addComment({
        interviewId,
        content: comment.trim(),
        rating: parseInt(rating),
      });

      toast.success("Comment submitted");
      setComment("");
      setRating("3");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to submit comment");
    }
  };

  //for stars
  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <StarIcon
          key={starValue}
          className={`h-4 w-4 transition-all duration-300 ${
            starValue <= rating
              ? "fill-yellow-400 text-yellow-400 drop-shadow-sm animate-pulse"
              : "text-muted-foreground hover:text-yellow-300"
          }`}
        />
      ))}
    </div>
  );

  if (existingComments === undefined || users === undefined) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* ENHANCED TRIGGER BUTTON - Responsive */}
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-full group relative overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10 
                     hover:from-primary/20 hover:to-secondary/20 border border-border/50 
                     transition-all duration-300 hover:shadow-lg hover:shadow-primary/25
                     hover:scale-[1.02] backdrop-blur-sm dark:from-primary/20 dark:to-secondary/20
                     dark:hover:from-primary/30 dark:hover:to-secondary/30"
        >
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
          />
          <MessageSquareIcon className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
          <SparklesIcon className="h-3 w-3 mr-1 opacity-60 animate-pulse" />
          <span className="hidden sm:inline">Add Comment</span>
          <span className="inline sm:hidden">Comment</span>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="w-[95vw] max-w-[700px] max-h-[90vh] overflow-hidden
                                bg-gradient-to-br from-background/95 to-muted/30 
                                backdrop-blur-xl border border-border/20 shadow-2xl
                                dark:from-background/95 dark:to-muted/40"
      >
        <DialogHeader className="relative pb-4">
          <div
            className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-primary/20 to-secondary/20 
                          rounded-full blur-xl animate-pulse"
          />
          <div
            className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent/20 to-primary/20 
                          rounded-full blur-lg animate-pulse delay-1000"
          />
          <DialogTitle
            className="text-lg sm:text-xl font-bold bg-gradient-to-r from-foreground to-muted-foreground 
                                 bg-clip-text text-transparent flex items-center gap-2 relative z-10"
          >
            <MessageSquareIcon className="h-5 w-5 text-primary" />
            Interview Feedback
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto max-h-[60vh] pr-2">
          <div className="space-y-6 relative z-10">
            {existingComments.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <SparklesIcon className="h-4 w-4 text-primary" />
                    <span className="hidden sm:inline">Previous Comments</span>
                    <span className="inline sm:hidden">Comments</span>
                  </h4>
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/30 
                              text-primary shadow-sm dark:from-primary/20 dark:to-secondary/20"
                  >
                    {existingComments.length}
                    <span className="hidden sm:inline ml-1">
                      Comment{existingComments.length !== 1 ? "s" : ""}
                    </span>
                  </Badge>
                </div>

                {/* ENHANCED EXISTING COMMENTS - Responsive */}
                <ScrollArea className="h-[200px] sm:h-[240px] pr-2">
                  <div className="space-y-3 sm:space-y-4">
                    {existingComments.map((comment, index) => {
                      const interviewer = getInterviewerInfo(
                        users,
                        comment.interviewerId
                      );
                      return (
                        <div
                          key={index}
                          className="group relative rounded-lg sm:rounded-xl border border-border/50 p-3 sm:p-5 space-y-2 sm:space-y-3
                                    bg-gradient-to-br from-card/80 to-muted/40 backdrop-blur-sm
                                    hover:shadow-lg hover:shadow-primary/10 transition-all duration-300
                                    hover:scale-[1.01] hover:border-primary/30"
                        >
                          <div
                            className="absolute top-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r 
                                          from-primary via-accent to-secondary rounded-t-lg sm:rounded-t-xl 
                                          opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          />

                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                              <div className="relative flex-shrink-0">
                                <Avatar
                                  className="h-8 w-8 sm:h-10 sm:w-10 ring-2 ring-primary/20 group-hover:ring-primary/40 
                                                 transition-all duration-300"
                                >
                                  <AvatarImage src={interviewer.image} />
                                  <AvatarFallback
                                    className="bg-gradient-to-br from-primary to-secondary 
                                                             text-primary-foreground font-semibold text-xs sm:text-sm"
                                  >
                                    {interviewer.initials}
                                  </AvatarFallback>
                                </Avatar>
                                <div
                                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 
                                              rounded-full border-2 border-background shadow-sm"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs sm:text-sm font-semibold text-foreground truncate">
                                  {interviewer.name}
                                </p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                                  <span className="truncate">
                                    {format(
                                      comment._creationTime,
                                      "MMM d, yyyy"
                                    )}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                              {renderStars(comment.rating)}
                              <span className="text-xs font-medium text-muted-foreground ml-1">
                                {comment.rating}/5
                              </span>
                            </div>
                          </div>
                          <div className="relative pl-0 sm:pl-13">
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                              {comment.content}
                            </p>
                            <div
                              className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b 
                                            from-primary to-transparent opacity-30 hidden sm:block"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* New Comment Form - Responsive */}
            <div
              className="space-y-4 sm:space-y-6 bg-card/60 backdrop-blur-sm rounded-lg sm:rounded-xl 
                           p-4 sm:p-6 border border-border/40"
            >
              {/* ENHANCED RATING - Responsive */}
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <StarIcon className="h-4 w-4 text-yellow-500" />
                  Rating
                </Label>
                <Select value={rating} onValueChange={setRating}>
                  <SelectTrigger
                    className="bg-background/70 border-border/60 hover:border-primary/60 
                                          transition-all duration-300 hover:shadow-sm"
                  >
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover/95 backdrop-blur-xl border-border/50">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <SelectItem
                        key={value}
                        value={value.toString()}
                        className="hover:bg-accent/80 transition-colors duration-200"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          {renderStars(value)}
                          <span className="text-xs text-muted-foreground hidden sm:inline">
                            {value === 1
                              ? "Poor"
                              : value === 2
                                ? "Fair"
                                : value === 3
                                  ? "Good"
                                  : value === 4
                                    ? "Very Good"
                                    : "Excellent"}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* ENHANCED COMMENT - Responsive */}
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <MessageSquareIcon className="h-4 w-4 text-primary" />
                  Your Feedback
                </Label>
                <div className="relative">
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your detailed thoughts about the candidate's performance..."
                    className="h-24 sm:h-36 bg-background/70 border-border/60 hover:border-primary/60 
                              focus:border-primary/80 transition-all duration-300 resize-none
                              placeholder:text-muted-foreground focus:shadow-lg focus:shadow-primary/10
                              text-sm"
                    maxLength={500}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {comment.length}/500
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FIXED FOOTER BUTTONS - Always visible */}
        <DialogFooter
          className="flex-shrink-0 pt-4 border-t border-border/20 relative z-10 
                                flex flex-col-reverse sm:flex-row gap-2 sm:gap-3"
        >
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto bg-background/60 hover:bg-muted/80 border-border/60 
                      hover:border-border transition-all duration-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!comment.trim()}
            className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 
                      hover:from-green-700 hover:to-emerald-700 text-white
                      dark:from-green-500 dark:to-emerald-500 dark:hover:from-green-600 dark:hover:to-emerald-600
                      shadow-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300
                      hover:scale-105 group relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed
                      disabled:hover:scale-100 border-0"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent 
                            translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
            />
            <SendIcon className="h-4 w-4 mr-2 group-hover:translate-x-0.5 transition-transform duration-300" />
            <span className="hidden sm:inline">Submit Feedback</span>
            <span className="inline sm:hidden">Submit</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default CommentDialog;
