import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Badge} from "@/components/ui/badge";
import {Skill} from "@/types/mission/Skill";
import {Award} from "lucide-react";

interface SkillsDialogProps {
    isOpen: boolean;
    onClose: () => void;
    skills: Skill[];
}

const SkillsDialog = ({isOpen, onClose, skills}: SkillsDialogProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl overflow-hidden rounded-[1.25rem] max-h-[90vh]">
                <div className="bg-white flex flex-col gap-6 overflow-y-auto scroll-hidden">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-[#1734B6]"/>
                            Compétences techniques
                        </DialogTitle>
                        <DialogDescription>
                            Liste des compétences requises pour cette mission
                        </DialogDescription>
                    </DialogHeader>

                    <div className="px-2">
                        {skills && skills.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <Badge
                                        key={index}
                                        className="bg-[#F9F5FF] text-[#6941C6] text-xs font-medium h-8 rounded-full border border-[#E9D7FE]"
                                    >
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Award className="w-12 h-12 text-[#667085] mb-4"/>
                                <h3 className="text-lg font-medium text-[#344054] mb-2">
                                    Aucune compétence spécifiée
                                </h3>
                                <p className="text-sm text-[#667085] max-w-sm">
                                    Cette mission n&#39;a pas de compétences techniques spécifiques requises.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SkillsDialog;