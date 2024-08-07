"use client";
import React, { useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Loader, SquarePlus } from "lucide-react";
import { submitProject } from "@/app/actions/createProject";
import { toast } from "sonner";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    const formData = {
      name,
      url,
      description,
    };
    const data = await submitProject(formData);
    if (data.success) {
      toast.success("Project created successfully 🎉");
      window.location.reload();
      setLoading(false);
    } else {
      toast.error("Failed to create project 😢");
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} className="flex items-center gap-2">
          Create Project <SquarePlus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[500px] max-w-[80vw] rounded-md">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="url">Project URL</Label>
            <Input
              id="url"
              placeholder="Enter project URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              placeholder="Enter project description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            {loading ? (
              <Button disabled>
                <Loader size={16} className="animate-spin" />
              </Button>
            ) : (
              <Button type="submit">Create</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProject;
