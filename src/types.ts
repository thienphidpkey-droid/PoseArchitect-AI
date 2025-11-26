
export interface PoseConcept {
  id: string;
  title: string;
  description: string;
  enhancedPrompt: string;
}

export interface GeneratedImage {
  id: string;
  conceptId: string;
  url: string;
  prompt: string;
  createdAt: number;
}

export enum AppState {
  IDLE = 'IDLE',
  BRAINSTORMING = 'BRAINSTORMING',
  SELECTING = 'SELECTING',
  GENERATING = 'GENERATING',
  FINISHED = 'FINISHED'
}

export type AppMode = 'creative' | 'business' | 'portrait';
export type UserRole = 'admin' | 'user';

export interface BrainstormOptions {
  mode: AppMode;
  useProModel: boolean;

  // --- Creative Mode Options ---
  shotTypes: {
    full: boolean;
    medium: boolean;
    extreme: boolean;
  };
  cameraAngles: {
    front: boolean;
    high: boolean;
    low: boolean;
    birdEye: boolean;
    worm: boolean;
    back: boolean;
    wide: boolean;
    telephoto: boolean;
    ots: boolean;
    pov: boolean;
  };
  bodyDirections: {
    frontal: boolean;
    fortyFive: boolean;
    ninety: boolean;
    back: boolean;
  };
  headDirections: {
    frontal: boolean;
    turned: boolean;
    profile: boolean;
    tiltedUp: boolean;
    tiltedDown: boolean;
    lookingBack: boolean;
  };
  gaze: {
    direct: boolean;
    away: boolean;
    down: boolean;
    closed: boolean;
    squint: boolean;
    up: boolean;
  };

  sitting: {
    floor: boolean;
    object: boolean;
    chair: boolean;
    fixedObject: boolean;
    kneeling: boolean;
    prone: boolean;
    supine: boolean;
    reclining: boolean;
    sideLying: boolean;
  };

  colorGrading: string;
  makeupStyle: string;
  includeSignature: boolean;
  signatureText: string;
  noMakeup: boolean;
  outfit: string;
  disableHairDescription: boolean;
  hairDetail: boolean;
  hairLength: {
    short: boolean;
    medium: boolean;
    long: boolean;
  };
  hairStyle: string;

  details: {
    fingers: boolean;
    oneHand: boolean;
    twoHands: boolean;
    faceAngles: boolean;
    lowJump: boolean;
    twoLegs: boolean;
    cuteFace: boolean;
  };
  customExpression: string;
  customAction: string;
  quote: string;

  // --- NEW: Pose Category Selections ---
  poseCategories: {
    fullBody: boolean;
    midShot: boolean;
    closeUp: boolean;
    handPoses: boolean;
    interaction: boolean;
    headAngles: boolean;
    cameraAngles: boolean;
    moodyDark: boolean;
    lifestyle: boolean;
  };

  // --- Business Profile Mode Options ---
  business: {
    gender: 'male' | 'female';
    hairStyles: Record<string, boolean>;
    selectedShotTypes: {
      closeUp: boolean;
      midShot: boolean;
      fullBody: boolean;
    };
    orientation: {
      frontal: boolean;
      bodyTurn: boolean;
      faceTurn: boolean;
    };
    sitting: {
      armchair: boolean;
      highChair: boolean;
      studioChair: boolean;
      woodenChair: boolean;
      sofa: boolean;
      table: boolean;
    };
    chairColor: string;
    tone: 'color' | 'bw';
    backgroundType: 'solid' | 'gradient' | 'random';
    backgroundColor: string;
    outfitDetails: {
      blazer: { enabled: boolean; color: string };
      vest: { enabled: boolean; color: string };
      shirt: { enabled: boolean; color: string };
      turtleneck: { enabled: boolean; color: string };
    };
    accessories: {
      notebook: boolean;
      watch: boolean;
      pen: boolean;
      laptop: boolean;
      phone: boolean;
      glasses: boolean;
      coffee: boolean;
      handbag: boolean;
    };
  };

  // --- Portrait Mode Options ---
  portrait: {
    skinTone: string;
    hairStyle: string;
    colorGrading: string;
    background: string;
    makeup: {
      eyes: string;
      face: string;
      lips: string;
    };
  };
}