export interface TranslationType {
  nav: {
    home: string
    buyingGuide: string
    usageGuide: string
    repairMaintenance: string
    lawsSafety: string
    faq: string
  }
  home: {
    welcome: {
      mainTitle: string
      subTitle: string
      startButton: string
    }
    sections: {
      buyingGuide: {
        title: string
        description: string
      }
      usageGuide: {
        title: string
        description: string
      }
      repairMaintenance: {
        title: string
        description: string
      }
      lawsSafety: {
        title: string
        description: string
      }
      faq: {
        title: string
        description: string
      }
      learnMore: string
    }
  }
  chat: {
    welcome: {
      title: string
      subtitle: string
    }
    input: {
      placeholder: string
    }
    button: {
      stop: string
    }
    avatar: {
      alt: string
    }
  }
  buyingGuide: {
    title: string
    subtitle: string
    recommendedScooters: {
      title: string
      subtitle: string
      details: {
        brand: string
        price: string
        range: string
        seniorSays: string
      }
    }
    purchaseChannels: {
      title: string
      subtitle: string
      details: {
        location: string
        contact: string
        priceRange: string
      }
    }
    registration: {
      title: string
      subtitle: string
      process: {
        title: string
        steps: string[]
      }
      notices: {
        title: string
        items: string[]
      }
    }
  }
  repairMaintenance: {
    title: string
    subtitle: string
    repairStations: {
      title: string
      seniorReviews: string
    }
    maintenanceTips: {
      title: string
      dailyCheck: {
        title: string
        description: string
      }
      batteryUsage: {
        title: string
        description: string
      }
      rainProtection: {
        title: string
        description: string
      }
      regularMaintenance: {
        title: string
        description: string
      }
      winterUsage: {
        title: string
        description: string
      }
    }
  }
  faq: {
    title: string
    subtitle: string
    loading: string
    error: string
  }
  footer: {
    about: {
      title: string
      description: string
    }
    contact: {
      title: string
      email: string
      wechat: string
    }
    links: {
      title: string
      feedback: string
      privacy: string
    }
    copyright: string
  }
  usageGuide: {
    title: string
    subtitle: string
    warning: string
    parkingRules: {
      title: string
      subtitle: string
      forbiddenAreas: {
        title: string
        areas: string[]
      }
      penalties: {
        title: string
        items: string[]
      }
      allowedAreas: string
    }
    chargingStations: {
      title: string
      sectionTitle: string
      mobileNote: string
      details: {
        price: string
        copied: string
      }
    }
    chargingMasters: {
      title: string
      subtitle: string
      error: string
    }
    safetyTips: {
      title: string
      tips: Array<{
        title: string
        description: string
      }>
    }
  }
  lawsSafety: {
    title: string
    subtitle: string
    campusRules: {
      title: string
      entry: {
        title: string
        description: string
      }
      riding: {
        title: string
        description: string
      }
      charging: {
        title: string
        description: string
      }
      violations: {
        title: string
        description: string
      }
    }
    cityRegulations: {
      title: string
      registration: {
        title: string
        description: string
      }
      helmet: {
        title: string
        description: string
      }
      restrictedAreas: {
        title: string
        description: string
      }
    }
  }
}

export interface Translations {
  zh: TranslationType
  en: TranslationType
}